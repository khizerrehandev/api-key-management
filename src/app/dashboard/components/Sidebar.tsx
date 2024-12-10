'use client';
import Link from 'next/link';
import Image from 'next/image';
import { 
  OverviewIcon, 
  ResearchAssistantIcon, 
  ResearchReportsIcon, 
  ApiPlaygroundIcon, 
  InvoicesIcon, 
  DocumentationIcon 
} from './icons'; // Import the icons

export default function Sidebar() {
  return (
    <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700">
      {/* Logo */}
      <div className="p-6">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="dark:invert"
          />
        </Link>
      </div>

      {/* Navigation */}
      <nav className="px-4 space-y-1">
        <Link 
          href="/dashboard"
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-900 dark:text-white bg-gray-100 dark:bg-gray-700 rounded-lg"
        >
          <OverviewIcon />
          Overview
        </Link>
        <Link 
          href="/dashboard/assistant"
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ResearchAssistantIcon />
          Research Assistant
        </Link>
        <Link 
          href="/dashboard/reports"
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ResearchReportsIcon />
          Research Reports
        </Link>
        <Link 
          href="/dashboard/api-playground"
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <ApiPlaygroundIcon />
          API Playground
        </Link>
        <Link 
          href="/dashboard/invoices"
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <InvoicesIcon />
          Invoices
        </Link>
        <Link 
          href="/dashboard/documentation"
          className="flex items-center px-4 py-2.5 text-sm font-medium text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg"
        >
          <DocumentationIcon />
          Documentation
        </Link>
      </nav>
    </aside>
  );
} 