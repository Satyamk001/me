"use client";

import React from "react";

/**
 * Normalizes any technology or framework name to its corresponding SVG icon path in /icons/
 */
export function getTechIconPath(name: string): string {
  const norm = name.trim().toLowerCase();

  // Frameworks & AI Ecosystem
  if (norm.includes("react native")) return "/icons/react-native.svg";
  if (norm.includes("react.js") || norm === "react") return "/icons/react.svg";
  if (norm.includes("next")) return "/icons/next-js.svg";
  if (norm.includes("node")) return "/icons/node-js.svg";
  if (norm.includes("express")) return "/icons/express-js.svg";
  if (norm.includes("nest")) return "/icons/nestjs.svg";
  if (norm.includes("fastapi")) return "/icons/fastapi.svg";
  if (norm.includes("langgraph")) return "/icons/langgraph.svg";
  if (norm.includes("langchain")) return "/icons/langchain.svg";
  if (norm.includes("langsmith")) return "/icons/langsmith.svg";
  if (norm.includes("rag")) return "/icons/rag-pipelines.svg";
  if (norm.includes("multi-agent") || norm.includes("multi agent")) return "/icons/multi-agent-systems.svg";
  if (norm.includes("tool calling") || norm.includes("react pattern")) return "/icons/tool-calling.svg";
  if (norm.includes("eval")) return "/icons/llm-evals.svg";
  if (norm.includes("pinecone")) return "/icons/pinecone.svg";
  if (norm.includes("chroma")) return "/icons/chromadb.svg";
  if (norm.includes("kafka")) return "/icons/apache-kafka.svg";
  if (norm.includes("rabbitmq")) return "/icons/rabbitmq.svg";
  if (norm.includes("redis")) return "/icons/redis.svg";
  if (norm.includes("postgres")) return "/icons/postgresql.svg";
  if (norm.includes("mysql")) return "/icons/mysql.svg";
  if (norm.includes("mongo")) return "/icons/mongodb.svg";
  if (norm.includes("docker")) return "/icons/docker.svg";
  if (norm.includes("socket")) return "/icons/socket-io.svg";
  if (norm.includes("typescript") || norm === "ts") return "/icons/typescript.svg";
  if (norm.includes("javascript") || norm === "js") return "/icons/javascript.svg";
  if (norm.includes("python") || norm === "py") return "/icons/python.svg";
  if (norm.includes("c++") || norm.includes("cpp")) return "/icons/cplusplus.svg";
  if (norm.includes("sql")) return "/icons/sql.svg";
  if (norm.includes("event-driven") || norm.includes("event driven")) return "/icons/event-driven-architecture.svg";
  if (norm.includes("microservice")) return "/icons/microservices.svg";
  if (norm.includes("rest")) return "/icons/rest-apis.svg";
  if (norm.includes("angular")) return "/icons/angular.svg";
  if (norm.includes("pytest")) return "/icons/pytest.svg";
  if (norm.includes("gemini")) return "/icons/google-gemini.svg";
  if (norm.includes("groq")) return "/icons/groq.svg";
  if (norm.includes("llama")) return "/icons/meta.svg";
  if (norm.includes("git")) return "/icons/git.svg";
  if (norm.includes("tailwind")) return "/icons/tailwind-css.svg";
  if (norm.includes("graphql")) return "/icons/graphql.svg";
  if (norm.includes("linux")) return "/icons/linux.svg";

  // Slug fallback
  const slug = norm
    .replace(/\+/g, "plus")
    .replace(/#/g, "sharp")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
  return `/icons/${slug}.svg`;
}

interface TechIconProps {
  name: string;
  className?: string;
  size?: number;
}

export default function TechIcon({
  name,
  className = "w-4 h-4",
  size = 16,
}: TechIconProps) {
  const iconPath = getTechIconPath(name);

  return (
    <img
      src={iconPath}
      alt={`${name} icon`}
      width={size}
      height={size}
      loading="lazy"
      className={`inline-block shrink-0 object-contain ${className}`}
      onError={(e) => {
        (e.target as HTMLElement).style.display = "none";
      }}
    />
  );
}
