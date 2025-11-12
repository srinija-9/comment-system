import React from "react";
import { Comment, SortOption } from "@/types";
import { users } from "../page";
import ClockIcon from "./icons/ClockIcon";
import CalendarIcon from "./icons/CalendarIcon";

const CommentsList = ({
  comments,
  sortBy,
  setSortBy,
}: {
  comments: Comment[];
  sortBy: SortOption;
  setSortBy: (sortBy: SortOption) => void;
}) => {
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
  return (
    <div>
      <div>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gray-900">
            Comments ({comments.length})
          </h2>

          <div className="flex gap-2">
            <button
              onClick={() => setSortBy("newest")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "newest"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <ClockIcon
                className={`h-5 w-5 ${
                  sortBy === "newest" ? "text-white" : "text-black"
                }`}
              />
              Newest
            </button>
            <button
              onClick={() => setSortBy("oldest")}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
                sortBy === "oldest"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50"
              }`}
            >
              <CalendarIcon
                className={`h-5 w-5 ${
                  sortBy === "oldest" ? "text-white" : "text-black"
                }`}
              />
              Oldest
            </button>
          </div>
        </div>

        <div className="space-y-4">
          {sortedComments.map((comment) => (
            <div
              key={comment.id}
              className="bg-white rounded-lg shadow-sm border border-gray-200 p-6"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-gray-800 text-white flex items-center justify-center font-semibold text-sm">
                    {getInitials(comment.name)}
                  </div>
                  <div>
                    <div className="font-semibold text-gray-900">
                      {comment.name}
                    </div>
                    <div className="text-sm text-gray-500">{comment.email}</div>
                  </div>
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {
                    users.find((user) => user.email === comment.email)?.company
                      .name
                  }
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed">{comment.body}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommentsList;
