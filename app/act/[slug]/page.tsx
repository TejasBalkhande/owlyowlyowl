// app/act/[slug]/page.tsx
import { sections } from "../lib/actSections";
import PracticeSessionClient from "./PracticeSessionClient";
import fs from "fs";
import path from "path";

// Helper to slugify (for URL) – stays lowercase
const slugify = (text: string) =>
  text
    .toLowerCase()
    .replace(/\s+/g, "-")
    .replace(/[^a-z0-9-]/g, "");

// Helper to create folder name from title (preserves case, spaces → hyphens)
const toFolderName = (text: string) =>
  text.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9-]/g, "");

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
  searchParams: Promise<{ from?: string }>;
}) {
  const { slug } = await params;
  const { from } = await searchParams;
  const levelInfo = findLevelInfo(slug);

  if (!levelInfo) {
    return <div>Practice level not found</div>;
  }

  // Build folder names matching disk structure
  const sectionFolder = slugify(levelInfo.section.name);   // e.g. "english"
  const levelFolder = toFolderName(levelInfo.level.title); // e.g. "Topic-Development"

  const jsonPath = path.join(
    process.cwd(),
    "public",
    "1-act",
    sectionFolder,
    levelFolder,
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

  // Image base path must match the same folder structure
  const imageBasePath = `/1-act/${sectionFolder}/${levelFolder}/`;

  return (
    <PracticeSessionClient
      initialData={data}
      levelInfo={levelInfo}
      imageBasePath={imageBasePath}
      isRoadmap={from === "roadmap"}
    />
  );
}