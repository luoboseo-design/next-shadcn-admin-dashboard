"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit,
  Trash2,
  GripVertical,
  FolderOpen,
  FileText,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

// 模拟分类数据
const mockCategories = [
  {
    id: "news",
    name: "新闻动态",
    slug: "news",
    description: "公司新闻和行业动态",
    postCount: 12,
    order: 1,
  },
  {
    id: "tutorial",
    name: "使用教程",
    slug: "tutorial",
    description: "平台使用指南和最佳实践",
    postCount: 28,
    order: 2,
  },
  {
    id: "case",
    name: "案例分享",
    slug: "case",
    description: "客户成功案例和效果展示",
    postCount: 15,
    order: 3,
  },
  {
    id: "industry",
    name: "行业资讯",
    slug: "industry",
    description: "SEO、GEO和营销行业最新资讯",
    postCount: 35,
    order: 4,
  },
  {
    id: "announcement",
    name: "平台公告",
    slug: "announcement",
    description: "产品更新、维护通知和重要公告",
    postCount: 8,
    order: 5,
  },
];

export default function BlogCategoriesPage() {
  const [categories, setCategories] = useState(mockCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<typeof mockCategories[0] | null>(null);
  const [newCategory, setNewCategory] = useState({
    name: "",
    slug: "",
    description: "",
  });

  const filteredCategories = categories.filter((cat) =>
    cat.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    cat.slug.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const totalPosts = categories.reduce((sum, cat) => sum + cat.postCount, 0);

  const handleAddCategory = () => {
    const id = newCategory.slug || newCategory.name.toLowerCase().replace(/\s+/g, "-");
    setCategories([
      ...categories,
      {
        id,
        name: newCategory.name,
        slug: newCategory.slug || id,
        description: newCategory.description,
        postCount: 0,
        order: categories.length + 1,
      },
    ]);
    setNewCategory({ name: "", slug: "", description: "" });
    setShowAddDialog(false);
  };

  const handleEditCategory = () => {
    if (!selectedCategory) return;
    setCategories(
      categories.map((cat) =>
        cat.id === selectedCategory.id ? selectedCategory : cat
      )
    );
    setShowEditDialog(false);
    setSelectedCategory(null);
  };

  const handleDeleteCategory = () => {
    if (!selectedCategory) return;
    setCategories(categories.filter((cat) => cat.id !== selectedCategory.id));
    setShowDeleteDialog(false);
    setSelectedCategory(null);
  };

  return (
    <div className="space-y-6">
      {/* 页面标题 */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">分类管理</h1>
          <p className="text-muted-foreground mt-1">管理博文分类，支持拖拽排序</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" asChild>
            <Link href="/admin/blog">
              <FileText className="h-4 w-4 mr-2" />
              返回博文列表
            </Link>
          </Button>
          <Button onClick={() => setShowAddDialog(true)}>
            <Plus className="h-4 w-4 mr-2" />
            新建分类
          </Button>
        </div>
      </div>

      {/* 统计 */}
      <div className="grid gap-4 sm:grid-cols-3">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">分类总数</p>
                <p className="text-2xl font-bold">{categories.length}</p>
              </div>
              <FolderOpen className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">博文总数</p>
                <p className="text-2xl font-bold">{totalPosts}</p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">平均每分类</p>
                <p className="text-2xl font-bold">
                  {Math.round(totalPosts / categories.length)} 篇
                </p>
              </div>
              <FileText className="h-8 w-8 text-muted-foreground/50" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 搜索 */}
      <Card>
        <CardContent className="pt-6">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="搜索分类..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </CardContent>
      </Card>

      {/* 分类列表 */}
      <Card>
        <CardContent className="p-0">
          <div className="divide-y">
            {filteredCategories.map((category) => (
              <div
                key={category.id}
                className="flex items-center gap-4 p-4 hover:bg-muted/50"
              >
                <div className="cursor-grab text-muted-foreground hover:text-foreground">
                  <GripVertical className="h-5 w-5" />
                </div>
                <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
                  <FolderOpen className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{category.name}</span>
                    <Badge variant="outline" className="text-xs">
                      /{category.slug}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground truncate">
                    {category.description}
                  </p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{category.postCount}</p>
                  <p className="text-xs text-muted-foreground">篇博文</p>
                </div>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowEditDialog(true);
                      }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      编辑
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      className="text-destructive"
                      onClick={() => {
                        setSelectedCategory(category);
                        setShowDeleteDialog(true);
                      }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      删除
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* 新建分类对话框 */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>新建分类</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="name">分类名称</Label>
              <Input
                id="name"
                placeholder="如：使用教程"
                value={newCategory.name}
                onChange={(e) => setNewCategory({ ...newCategory, name: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="slug">URL 别名</Label>
              <div className="flex items-center gap-2">
                <span className="text-muted-foreground text-sm">/blog/category/</span>
                <Input
                  id="slug"
                  placeholder="tutorial"
                  value={newCategory.slug}
                  onChange={(e) => setNewCategory({ ...newCategory, slug: e.target.value })}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="description">描述</Label>
              <Textarea
                id="description"
                placeholder="分类描述..."
                value={newCategory.description}
                onChange={(e) => setNewCategory({ ...newCategory, description: e.target.value })}
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              取消
            </Button>
            <Button onClick={handleAddCategory} disabled={!newCategory.name}>
              创建
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 编辑分类对话框 */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>编辑分类</DialogTitle>
          </DialogHeader>
          {selectedCategory && (
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="edit-name">分类名称</Label>
                <Input
                  id="edit-name"
                  value={selectedCategory.name}
                  onChange={(e) =>
                    setSelectedCategory({ ...selectedCategory, name: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-slug">URL 别名</Label>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground text-sm">/blog/category/</span>
                  <Input
                    id="edit-slug"
                    value={selectedCategory.slug}
                    onChange={(e) =>
                      setSelectedCategory({ ...selectedCategory, slug: e.target.value })
                    }
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="edit-description">描述</Label>
                <Textarea
                  id="edit-description"
                  value={selectedCategory.description}
                  onChange={(e) =>
                    setSelectedCategory({ ...selectedCategory, description: e.target.value })
                  }
                  rows={3}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              取消
            </Button>
            <Button onClick={handleEditCategory}>保存</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* 删除确认对话框 */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>确认删除</DialogTitle>
          </DialogHeader>
          <p className="text-muted-foreground">
            确定要删除分类 "{selectedCategory?.name}" 吗？
            {selectedCategory && selectedCategory.postCount > 0 && (
              <span className="text-destructive">
                {" "}该分类下有 {selectedCategory.postCount} 篇博文，删除后这些博文将变为未分类。
              </span>
            )}
          </p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              取消
            </Button>
            <Button variant="destructive" onClick={handleDeleteCategory}>
              确认删除
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
