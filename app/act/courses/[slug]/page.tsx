// app/act/courses/[slug]/page.tsx
import { notFound } from "next/navigation";
import { courses } from "../coursesData";
import CourseDetailClient from "./CourseDetailClient";

// Required for static export – generates all possible slug paths at build time
export function generateStaticParams() {
  return courses.map((course) => ({
    slug: course.slug,
  }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const course = courses.find((c) => c.slug === slug);
  if (!course) notFound();

  return <CourseDetailClient course={course} />;
}