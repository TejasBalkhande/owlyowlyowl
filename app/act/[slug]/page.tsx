// app/act/[slug]/page.tsx
import { sections } from "../lib/actSections";
import PracticeSessionClient from "./PracticeSessionClient";

const slugify = (text: string) =>
  text.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, "");

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

  const sectionFolder = slugify(levelInfo.section.name);
  const levelFolder = toFolderName(levelInfo.level.title);
  const imageBasePath = `/1-act/${sectionFolder}/${levelFolder}/`;

  // ✅ No server‑side fetch – pass null and let client load it
  return (
    <PracticeSessionClient
      initialData={null}
      levelInfo={levelInfo}
      imageBasePath={imageBasePath}
      isRoadmap={from === "roadmap"}
    />
  );
}