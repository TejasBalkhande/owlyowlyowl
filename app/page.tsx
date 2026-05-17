
import Navbar from "@/components/Navbar";
import { MenuItem } from "@/types/menu";
import Image from "next/image";

const menuItems: MenuItem[] = [
  {
    label: "College Entrance Exams",
    children: [
      { label: "SAT (Scholastic Assessment Test)", href: "/sat" },
      { label: "ACT (American College Testing)", href: "/act" },
      { label: "GED (General Educational Development)", href: "/GED" },
    ],
  },
  {
    label: "College Credit / Placement Exams",
    children: [
      { label: "AP (Advanced Placement)", href: "/ap" },
      { label: "CLEP (College-Level Examination Program)", href: "/clep" },
      // Add more credit exams if needed
    ],
  },
  {
    label: "Admission Exams",
    children: [
      { label: "MCAT (Medical College Admission Test)", href: "/mcat" },
      { label: "GMAT (Graduate Management Admission Test)", href: "/gmat" },
      { label: "GRE (Graduate Record Examination)", href: "/gre" },
      { label: "LSAT (Law School Admission Test)", href: "/lsat" },
    ],
  },
  {
    label: "Licensing Exams",
    children: [
      { label: "FE (Fundamentals of Engineering)", href: "/fe" },
      { label: "PE (Principles and Practice of Engineering)", href: "/pe" },
      { label: "USMLE (United States Medical Licensing Examination)", href: "/usmle" },
      { label: "NCLEX (National Council Licensure Examination)", href: "/nclex" },
      { label: "Bar Exam", href: "/bar" },
    ],
  },
  {
    label: "U.S. Government & Civil Exams",
    children: [
      { label: "Federal Civil Service Exams", href: "/federal-civil-service" },
      { label: "USPS Exams", href: "/usps" },
      { label: "State Civil Service Exams", href: "/state-civil-service" },
      { label: "Public Safety & Protective Services Exams", href: "/public-safety" },
    ],
  },
 

]


export default function Home() {
  return (
    <>
      <Navbar items={menuItems} logo="OwlenForge" />
      <main className="container mx-auto px-4 py-4">
        <Image src="/logo1.png" alt="OwlenForge Logo" width={120}  height={120}  priority className="mb-4" />
        <h1 className="text-3xl font-bold">Welcome to ExamPrep</h1>
        <p className="mt-4">Your one-stop destination for all exam prep.</p>
      </main>
    </>
  ); 
}