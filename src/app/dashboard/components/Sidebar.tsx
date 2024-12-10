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

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void; // Add a prop for the toggle function
}

export default function Sidebar({ isOpen, onToggle }: SidebarProps) {
  return (
    <aside className="h-screen w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col">
      {/* Logo and Toggle Button */}
      <div className="p-6 flex justify-between items-center border-b border-gray-200 dark:border-gray-700">
        <Link href="/dashboard" className="flex items-center">
          <Image
            src="/logo.png"
            alt="Logo"
            width={120}
            height={40}
            className="dark:invert"
          />
        </Link>
        <button onClick={onToggle} className="text-gray-600 dark:text-gray-300">
          {isOpen ? (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          )}
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto py-4">
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