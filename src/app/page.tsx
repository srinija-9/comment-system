"use client";

import { useState, useMemo } from "react";
import { User, Comment, SortOption } from "@/types";
import CommentsList from "./components/CommentsList";
import Image from "next/image";
import messageIcon from "./assets/icons/message.svg";
import paperIcon from "./assets/icons/paper.svg";
import dynamic from "next/dynamic";
import type { SingleValue, GroupBase } from "react-select";

type UserOption = {
  value: string;
  label: string;
  data: User;
};

const Select = dynamic(() => import("react-select"), {
  ssr: false,
}) as unknown as typeof import("react-select").default<
  UserOption,
  false,
  GroupBase<UserOption>
>;

export const users: User[] = [
  {
    id: 1,
    name: "John Doe",
    email: "john.doe@techcorp.com",
    company: {
      name: "TechCorp Solutions",
    },
  },
  {
    id: 2,
    name: "Sarah Johnson",
    email: "sarah.johnson@innovate.io",
    company: {
      name: "Innovate Technologies",
    },
  },
  {
    id: 3,
    name: "Mike Chen",
    email: "mike.chen@webdev.co",
    company: {
      name: "WebDev Co.",
    },
  },
  {
    id: 4,
    name: "Emma Wilson",
    email: "emma.wilson@startup.xyz",
    company: {
      name: "StartupXYZ",
    },
  },
  {
    id: 5,
    name: "David Rodriguez",
    email: "david.rodriguez@agency.net",
    company: {
      name: "Creative Agency",
    },
  },
  {
    id: 6,
    name: "Lisa Park",
    email: "lisa.park@design.studio",
    company: {
      name: "Design Studio Pro",
    },
  },
  {
    id: 7,
    name: "Alex Thompson",
    email: "alex.thompson@code.works",
    company: {
      name: "CodeWorks Inc.",
    },
  },
  {
    id: 8,
    name: "Maria Garcia",
    email: "maria.garcia@digital.hub",
    company: {
      name: "Digital Hub Solutions",
    },
  },
];

export default function Home() {
  const [selectedUser, setSelectedUser] = useState<string>("");
  const [comment, setComment] = useState<string>("");
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [comments, setComments] = useState<Comment[]>([
    {
      id: 1,
      postId: 1,
      name: "John Doe",
      email: "john.doe@techcorp.com",
      body: "This is a really insightful post! I've been working with similar technologies and found this approach quite effective. The examples you provided are clear and well-documented.",
      timestamp: new Date("2024-11-08T10:30:00"),
    },
    {
      id: 2,
      postId: 1,
      name: "Sarah Johnson",
      email: "sarah.johnson@innovate.io",
      body: "Great explanation! I had some questions about the implementation details, but your code samples cleared everything up. Looking forward to trying this out in my project.",
      timestamp: new Date("2024-11-08T09:15:00"),
    },
    {
      id: 3,
      postId: 1,
      name: "Mike Chen",
      email: "mike.chen@webdev.co",
      body: "Thanks for sharing this! The performance improvements you mentioned are exactly what we needed for our application. The before/after benchmarks really help demonstrate the impact.",
      timestamp: new Date("2024-11-08T08:00:00"),
    },
    {
      id: 4,
      postId: 1,
      name: "Emma Wilson",
      email: "emma.wilson@startup.xyz",
      body: "Excellent tutorial! I appreciate how you broke down complex concepts into digestible steps. The troubleshooting section at the end is particularly valuable.",
      timestamp: new Date("2024-11-08T07:00:00"),
    },
    {
      id: 5,
      postId: 1,
      name: "David Rodriguez",
      email: "david.rodriguez@agency.net",
      body: "This approach saved us hours of development time. The integration was smoother than expected, and the documentation quality is outstanding. Highly recommended!",
      timestamp: new Date("2024-11-08T06:00:00"),
    },
  ]);

  const handlePostComment = (): void => {
    if (!selectedUser || !comment.trim()) return;

    const user = users.find((u) => u.id === parseInt(selectedUser));
    if (!user) return;

    const newComment: Comment = {
      id: comments.length + 1,
      postId: comments.length + 1,
      name: user.name,
      email: user.email,
      body: comment,
      timestamp: new Date(),
    };
    setComments([...comments, newComment]);
    setComment("");
    setSelectedUser("");
  };
  const sortedComments = [...comments].sort((a, b) => {
    return sortBy === "newest"
      ? b.timestamp.getTime() - a.timestamp.getTime()
      : a.timestamp.getTime() - b.timestamp.getTime();
  });

  const getInitials = (name: string): string => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase();
  };

  const selectOptions = useMemo<UserOption[]>(
    () =>
      users.map((user) => ({
        value: user.id.toString(),
        label: user.name,
        data: user,
      })),
    []
  );

  const selectedOption = selectOptions.find(
    (option) => option.value === selectedUser
  );

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Comment System
          </h1>
          <p className="text-gray-600 text-lg">
            Share your thoughts and engage with the community. Join the
            conversation below!
          </p>
        </div>

        {/* Add Comment Section */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center gap-2 mb-6">
            <Image src={messageIcon} alt="message" width={24} height={24} />
            <h2 className="text-xl font-semibold text-gray-900">
              Add a Comment
            </h2>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select User
              </label>

              <Select
                value={selectedOption ?? null}
                onChange={(option: SingleValue<UserOption>) =>
                  setSelectedUser(option?.value ?? "")
                }
                options={selectOptions}
                placeholder="Choose a user to comment as..."
                formatOptionLabel={(option: UserOption) => (
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-sm">
                      {getInitials(option.data.name)}
                    </div>
                    <span className="font-semibold text=xs">
                      {option.data.name}
                    </span>
                    <span className="text-xs">
                      ({option.data.company.name})
                    </span>
                  </div>
                )}
                styles={{
                  control: (base) => ({
                    ...base,
                    padding: "2px 4px",
                    borderRadius: 12,
                    backgroundColor: "#f9fafb",
                    borderColor: "#d1d5db",
                    minHeight: "3.25rem",
                    boxShadow: "none",
                    "&:hover": {
                      borderColor: "#93c5fd",
                    },
                  }),
                  option: (base, state) => ({
                    ...base,
                    backgroundColor: state.isFocused ? "#1e2939" : "#FFFFFF",
                    color: state.isFocused ? "#FFFFFF" : "#111827",
                    cursor: "pointer",
                  }),
                  menu: (base) => ({
                    ...base,
                    borderRadius: 12,
                    overflow: "hidden",
                  }),
                  menuList: (base) => ({
                    ...base,
                    padding: 0,
                  }),
                }}
                classNamePrefix="user-select"
                isClearable
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Your Comment
              </label>
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write your comment here..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none resize-none text-gray-700 bg-gray-50"
              />
            </div>

            <button
              onClick={handlePostComment}
              disabled={!selectedUser || !comment.trim()}
              className="flex items-center gap-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed font-medium"
            >
              {/* <Send className="w-4 h-4" /> */}
              <Image src={paperIcon} alt="message" width={24} height={24} />
              Post Comment
            </button>
          </div>
        </div>

        {/* Comments List */}
        <CommentsList
          comments={sortedComments}
          sortBy={sortBy}
          setSortBy={(sortBy: SortOption) => setSortBy(sortBy as SortOption)}
        />
      </div>
    </div>
  );
}
