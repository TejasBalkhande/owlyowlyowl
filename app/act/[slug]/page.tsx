// app/act/[slug]/page.tsx
import { sections } from "../lib/actSections";
import PracticeSessionClient from "./PracticeSessionClient";
import fs from "fs";
import path from "path";
import { getCurrentUser } from "@/lib/session";

const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

export async function generateStaticParams() {
  const paths = [];
  for (const section of sections) {
    for (const option of section.options) {
      for (const level of option.practiceLevels) {
        paths.push({ slug: slugify(level.title) });
      }
    }
  }
  return paths;
}

function findLevelInfo(slug: string) {
  for (const section of sections) {
    for (const option of section.options) {
      const level = option.practiceLevels.find(
        (l) => slugify(l.title) === slug
      );
      if (level) {
        return { section, level };
      }
    }
  }
  return null;
}

export default async function Page({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ from?: string; itemId?: string }>;
}) {
  const { slug } = await params;
  const { from, itemId } = await searchParams;
  const levelInfo = findLevelInfo(slug);

  if (!levelInfo) {
    return <div>Practice level not found</div>;
  }

  const sectionSlug = slugify(levelInfo.section.name);
  const levelSlug = slugify(levelInfo.level.title);
  const jsonPath = path.join(
    process.cwd(),
    "public",
    "1-act",
    sectionSlug,
    levelSlug,
    "questions.json"
  );

  let data = null;
  try {
    if (fs.existsSync(jsonPath)) {
      const fileContents = fs.readFileSync(jsonPath, "utf8");
      data = JSON.parse(fileContents);
    } else {
      console.log(`No questions.json found for ${slug} – showing placeholder.`);
    }
  } catch (err) {
    console.error(`Failed to load questions.json for ${slug}:`, err);
  }

  const imageBasePath = `/1-act/${sectionSlug}/${levelSlug}/`;
  const user = await getCurrentUser();

  return (
    <PracticeSessionClient
      initialData={data}
      levelInfo={levelInfo}
      imageBasePath={imageBasePath}
      isRoadmap={from === "roadmap"}
      itemId={itemId ? parseInt(itemId, 10) : undefined}
      isLoggedIn={!!user}
    />
  );
}