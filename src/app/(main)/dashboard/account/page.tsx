"use client";

import { useState } from "react";

import { Check, Globe, Pencil, Plus, Trash2, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Project {
  id: string;
  name: string;
  url: string;
}

export default function AccountPage() {
  const [email, setEmail] = useState("user@example.com");
  const [isEditingEmail, setIsEditingEmail] = useState(false);
  const [tempEmail, setTempEmail] = useState(email);

  const [projects, setProjects] = useState<Project[]>([
    { id: "1", name: "主站", url: "https://example.com" },
    { id: "2", name: "博客", url: "https://blog.example.com" },
  ]);

  const [newProject, setNewProject] = useState({ name: "", url: "" });
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [tempProject, setTempProject] = useState<Project | null>(null);

  const handleSaveEmail = () => {
    setEmail(tempEmail);
    setIsEditingEmail(false);
  };

  const handleAddProject = () => {
    if (newProject.name && newProject.url) {
      setProjects([...projects, { id: Date.now().toString(), ...newProject }]);
      setNewProject({ name: "", url: "" });
      setIsAddingProject(false);
    }
  };

  const handleDeleteProject = (id: string) => {
    setProjects(projects.filter((p) => p.id !== id));
  };

  const handleEditProject = (project: Project) => {
    setEditingProjectId(project.id);
    setTempProject({ ...project });
  };

  const handleSaveProject = () => {
    if (tempProject) {
      setProjects(projects.map((p) => (p.id === tempProject.id ? tempProject : p)));
      setEditingProjectId(null);
      setTempProject(null);
    }
  };

  const handleCancelEditProject = () => {
    setEditingProjectId(null);
    setTempProject(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold">账户设置</h1>
        <p className="text-sm text-muted-foreground mt-1">管理您的账户信息和项目</p>
      </div>

      {/* 基本信息 */}
      <Card>
        <CardHeader className="pb-4">
          <CardTitle className="text-base">基本信息</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {/* 邮箱 */}
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <Label className="text-sm text-muted-foreground">邮箱</Label>
              {isEditingEmail ? (
                <Input value={tempEmail} onChange={(e) => setTempEmail(e.target.value)} className="mt-1 h-8 w-64" />
              ) : (
                <p className="text-sm mt-0.5">{email}</p>
              )}
            </div>
            {isEditingEmail ? (
              <div className="flex gap-2">
                <Button size="sm" variant="ghost" onClick={() => setIsEditingEmail(false)}>
                  取消
                </Button>
                <Button size="sm" onClick={handleSaveEmail}>
                  保存
                </Button>
              </div>
            ) : (
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setTempEmail(email);
                  setIsEditingEmail(true);
                }}
              >
                修改
              </Button>
            )}
          </div>

          {/* 密码 */}
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <Label className="text-sm text-muted-foreground">密码</Label>
              <p className="text-sm mt-0.5">••••••••</p>
            </div>
            <Button size="sm" variant="ghost">
              修改
            </Button>
          </div>

          {/* 手机号 */}
          <div className="flex items-center justify-between py-2">
            <div>
              <Label className="text-sm text-muted-foreground">手机号</Label>
              <p className="text-sm mt-0.5 text-muted-foreground">未绑定</p>
            </div>
            <Button size="sm" variant="ghost">
              绑定
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* 项目管理 */}
      <Card>
        <CardHeader className="pb-4">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-base">项目管理</CardTitle>
              <CardDescription className="text-xs mt-1">管理您的网站项目，下单时可快速选择</CardDescription>
            </div>
            {!isAddingProject && (
              <Button size="sm" variant="outline" onClick={() => setIsAddingProject(true)}>
                <Plus className="h-4 w-4 mr-1" />
                添加项目
              </Button>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {projects.map((project) => (
              <div key={project.id} className="flex items-center justify-between p-3 border rounded-lg">
                {editingProjectId === project.id && tempProject ? (
                  <div className="flex-1 flex items-center gap-3">
                    <Input
                      value={tempProject.name}
                      onChange={(e) => setTempProject({ ...tempProject, name: e.target.value })}
                      placeholder="项目名称"
                      className="h-8 w-32"
                    />
                    <Input
                      value={tempProject.url}
                      onChange={(e) => setTempProject({ ...tempProject, url: e.target.value })}
                      placeholder="网址"
                      className="h-8 flex-1"
                    />
                    <div className="flex gap-1">
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleSaveProject}>
                        <Check className="h-4 w-4" />
                      </Button>
                      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={handleCancelEditProject}>
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-muted flex items-center justify-center">
                        <Globe className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="text-sm font-medium">{project.name}</p>
                        <p className="text-xs text-muted-foreground">{project.url}</p>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8"
                        onClick={() => handleEditProject(project)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-8 w-8 text-destructive"
                        onClick={() => handleDeleteProject(project.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </>
                )}
              </div>
            ))}

            {/* 添加新项目 */}
            {isAddingProject && (
              <div className="flex items-center gap-3 p-3 border rounded-lg border-dashed">
                <Input
                  value={newProject.name}
                  onChange={(e) => setNewProject({ ...newProject, name: e.target.value })}
                  placeholder="项目名称"
                  className="h-8 w-32"
                />
                <Input
                  value={newProject.url}
                  onChange={(e) => setNewProject({ ...newProject, url: e.target.value })}
                  placeholder="https://example.com"
                  className="h-8 flex-1"
                />
                <div className="flex gap-1">
                  <Button size="sm" onClick={handleAddProject} disabled={!newProject.name || !newProject.url}>
                    添加
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => {
                      setIsAddingProject(false);
                      setNewProject({ name: "", url: "" });
                    }}
                  >
                    取消
                  </Button>
                </div>
              </div>
            )}

            {projects.length === 0 && !isAddingProject && (
              <div className="text-center py-8 text-sm text-muted-foreground">暂无项目，点击上方按钮添加</div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
