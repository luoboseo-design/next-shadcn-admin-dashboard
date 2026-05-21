"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Link from "@tiptap/extension-link";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Bold,
  Italic,
  List,
  ListOrdered,
  Heading1,
  Heading2,
  Heading3,
  Link as LinkIcon,
  Undo,
  Redo,
  Quote,
  Code,
  Minus,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface RichTextEditorProps {
  content: string;
  onChange: (content: string) => void;
  placeholder?: string;
  disabled?: boolean;
  className?: string;
}

export function RichTextEditor({
  content,
  onChange,
  placeholder = "开始撰写内容...",
  disabled = false,
  className,
}: RichTextEditorProps) {
  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder,
      }),
      Link.configure({
        openOnClick: false,
        HTMLAttributes: {
          class: "text-primary underline",
        },
      }),
    ],
    content: content,
    editable: !disabled,
    onUpdate: ({ editor }) => {
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class:
          "prose prose-sm sm:prose dark:prose-invert max-w-none min-h-[400px] p-4 focus:outline-none",
      },
    },
  });

  // 当外部内容变化时更新编辑器（用于AI生成内容）
  useEffect(() => {
    if (editor && content !== editor.getHTML()) {
      // 将 Markdown 转换为 HTML（简单处理）
      const htmlContent = markdownToHtml(content);
      editor.commands.setContent(htmlContent);
    }
  }, [content, editor]);

  // 简单的 Markdown 转 HTML
  const markdownToHtml = (md: string) => {
    if (!md) return "";
    
    // 如果已经是 HTML，直接返回
    if (md.startsWith("<")) return md;
    
    let html = md
      // 处理标题
      .replace(/^### (.+)$/gm, "<h3>$1</h3>")
      .replace(/^## (.+)$/gm, "<h2>$1</h2>")
      .replace(/^# (.+)$/gm, "<h1>$1</h1>")
      // 处理粗体
      .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
      // 处理斜体
      .replace(/\*(.+?)\*/g, "<em>$1</em>")
      // 处理无序列表
      .replace(/^- (.+)$/gm, "<li>$1</li>")
      // 处理链接
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2">$1</a>')
      // 处理换行
      .replace(/\n\n/g, "</p><p>")
      .replace(/\n/g, "<br>");

    // 包装列表项
    html = html.replace(/(<li>.*<\/li>)+/g, "<ul>$&</ul>");
    
    // 包装段落
    if (!html.startsWith("<")) {
      html = `<p>${html}</p>`;
    }

    return html;
  };

  const setLink = () => {
    const url = window.prompt("输入链接地址:");
    if (url && editor) {
      editor.chain().focus().setLink({ href: url }).run();
    }
  };

  if (!editor) {
    return null;
  }

  const ToolbarButton = ({
    onClick,
    isActive,
    disabled: buttonDisabled,
    children,
    tooltip,
  }: {
    onClick: () => void;
    isActive?: boolean;
    disabled?: boolean;
    children: React.ReactNode;
    tooltip: string;
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onClick}
          disabled={buttonDisabled || disabled}
          className={cn(
            "h-8 w-8 p-0",
            isActive && "bg-muted text-primary"
          )}
        >
          {children}
        </Button>
      </TooltipTrigger>
      <TooltipContent side="bottom" className="text-xs">
        {tooltip}
      </TooltipContent>
    </Tooltip>
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className={cn("border rounded-lg overflow-hidden", className)}>
        {/* 工具栏 */}
        <div className="flex items-center gap-0.5 p-2 border-b bg-muted/30 flex-wrap">
          <div className="flex items-center gap-0.5 mr-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
              isActive={editor.isActive("heading", { level: 1 })}
              tooltip="标题 1"
            >
              <Heading1 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
              isActive={editor.isActive("heading", { level: 2 })}
              tooltip="标题 2"
            >
              <Heading2 className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
              isActive={editor.isActive("heading", { level: 3 })}
              tooltip="标题 3"
            >
              <Heading3 className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-border mr-2" />

          <div className="flex items-center gap-0.5 mr-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBold().run()}
              isActive={editor.isActive("bold")}
              tooltip="粗体"
            >
              <Bold className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleItalic().run()}
              isActive={editor.isActive("italic")}
              tooltip="斜体"
            >
              <Italic className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleCode().run()}
              isActive={editor.isActive("code")}
              tooltip="代码"
            >
              <Code className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-border mr-2" />

          <div className="flex items-center gap-0.5 mr-2">
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBulletList().run()}
              isActive={editor.isActive("bulletList")}
              tooltip="无序列表"
            >
              <List className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleOrderedList().run()}
              isActive={editor.isActive("orderedList")}
              tooltip="有序列表"
            >
              <ListOrdered className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().toggleBlockquote().run()}
              isActive={editor.isActive("blockquote")}
              tooltip="引用"
            >
              <Quote className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-border mr-2" />

          <div className="flex items-center gap-0.5 mr-2">
            <ToolbarButton
              onClick={setLink}
              isActive={editor.isActive("link")}
              tooltip="插入链接"
            >
              <LinkIcon className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().setHorizontalRule().run()}
              tooltip="分隔线"
            >
              <Minus className="h-4 w-4" />
            </ToolbarButton>
          </div>

          <div className="w-px h-6 bg-border mr-2" />

          <div className="flex items-center gap-0.5">
            <ToolbarButton
              onClick={() => editor.chain().focus().undo().run()}
              disabled={!editor.can().undo()}
              tooltip="撤销"
            >
              <Undo className="h-4 w-4" />
            </ToolbarButton>
            <ToolbarButton
              onClick={() => editor.chain().focus().redo().run()}
              disabled={!editor.can().redo()}
              tooltip="重做"
            >
              <Redo className="h-4 w-4" />
            </ToolbarButton>
          </div>
        </div>

        {/* 编辑区 */}
        <EditorContent
          editor={editor}
          className={cn(
            "bg-background",
            disabled && "opacity-50 cursor-not-allowed"
          )}
        />
      </div>
    </TooltipProvider>
  );
}
