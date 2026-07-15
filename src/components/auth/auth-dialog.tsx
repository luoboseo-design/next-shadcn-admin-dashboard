"use client";

import { useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { Eye, EyeOff, Lock, Mail, Sparkles } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import { siGoogle } from "simple-icons";
import { toast } from "sonner";
import { z } from "zod";

import { SimpleIcon } from "@/components/simple-icon";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Field, FieldContent, FieldError, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type AuthMode = "login" | "register";

const loginSchema = z.object({
  email: z.string().email({ message: "请输入有效的邮箱地址" }),
  password: z.string().min(6, { message: "密码至少需要 6 个字符" }),
  remember: z.boolean().optional(),
});

const registerSchema = z
  .object({
    email: z.string().email({ message: "请输入有效的邮箱地址" }),
    password: z.string().min(6, { message: "密码至少需要 6 个字符" }),
    confirmPassword: z.string().min(6, { message: "确认密码至少需要 6 个字符" }),
    agree: z.boolean().refine((v) => v, { message: "请先同意服务条款和隐私政策" }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "两次输入的密码不一致",
    path: ["confirmPassword"],
  });

interface AuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** 弹窗顶部提示文案，说明为什么需要登录（如"创建任务前请先登录"） */
  reason?: string;
  /** 默认展示的面板 */
  defaultMode?: AuthMode;
  /** 登录/注册成功后的回调 */
  onSuccess?: () => void;
}

export function AuthDialog({ open, onOpenChange, reason, defaultMode = "login", onSuccess }: AuthDialogProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);

  const handleSuccess = () => {
    onOpenChange(false);
    onSuccess?.();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md gap-0 overflow-hidden p-0">
        {/* 头部品牌区 */}
        <DialogHeader className="items-center gap-2 border-b bg-muted/40 px-6 pt-8 pb-6 text-center">
          <div className="flex size-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            <Sparkles className="size-6" />
          </div>
          <DialogTitle className="text-xl">{mode === "login" ? "欢迎回来" : "创建账户"}</DialogTitle>
          <DialogDescription className="text-pretty">
            {reason ?? (mode === "login" ? "登录后即可创建任务并管理您的服务" : "注册后即可开始使用全部营销服务")}
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col gap-4 px-6 py-6">
          {/* Google 登录 */}
          <Button variant="secondary" className="w-full" type="button">
            <SimpleIcon icon={siGoogle} className="size-4" />
            使用 Google 继续
          </Button>

          <div className="flex items-center gap-3">
            <span className="h-px flex-1 bg-border" />
            <span className="text-xs text-muted-foreground">或使用邮箱</span>
            <span className="h-px flex-1 bg-border" />
          </div>

          {mode === "login" ? <DialogLoginForm onSuccess={handleSuccess} /> : <DialogRegisterForm onSuccess={handleSuccess} />}

          {/* 模式切换 */}
          <p className="text-center text-sm text-muted-foreground">
            {mode === "login" ? (
              <>
                还没有账户？{" "}
                <button
                  type="button"
                  onClick={() => setMode("register")}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  立即注册
                </button>
              </>
            ) : (
              <>
                已有账户？{" "}
                <button
                  type="button"
                  onClick={() => setMode("login")}
                  className="font-medium text-primary underline-offset-4 hover:underline"
                >
                  直接登录
                </button>
              </>
            )}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}

function PasswordInput({
  id,
  autoComplete,
  ...props
}: React.ComponentProps<typeof Input> & { id: string; autoComplete: string }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="relative">
      <Lock className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
      <Input {...props} id={id} type={visible ? "text" : "password"} autoComplete={autoComplete} className="px-9" />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground hover:text-foreground"
        aria-label={visible ? "隐藏密码" : "显示密码"}
      >
        {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
      </button>
    </div>
  );
}

function DialogLoginForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "", remember: false },
  });

  const onSubmit = (data: z.infer<typeof loginSchema>) => {
    toast.success("登录成功", { description: `欢迎回来，${data.email}` });
    onSuccess();
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="auth-login-email">邮箱</FieldLabel>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  id="auth-login-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="pl-9"
                  aria-invalid={fieldState.invalid}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <div className="flex items-center justify-between">
                <FieldLabel htmlFor="auth-login-password">密码</FieldLabel>
                <button type="button" className="text-xs text-muted-foreground underline-offset-4 hover:text-primary hover:underline">
                  忘记密码？
                </button>
              </div>
              <PasswordInput
                {...field}
                id="auth-login-password"
                placeholder="••••••••"
                autoComplete="current-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="remember"
          render={({ field }) => (
            <Field orientation="horizontal">
              <Checkbox
                id="auth-login-remember"
                name={field.name}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
              />
              <FieldContent>
                <FieldLabel htmlFor="auth-login-remember" className="font-normal">
                  30 天内保持登录
                </FieldLabel>
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit">
        登录
      </Button>
    </form>
  );
}

function DialogRegisterForm({ onSuccess }: { onSuccess: () => void }) {
  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
    defaultValues: { email: "", password: "", confirmPassword: "", agree: false },
  });

  const onSubmit = (data: z.infer<typeof registerSchema>) => {
    toast.success("注册成功", { description: `欢迎加入，${data.email}` });
    onSuccess();
  };

  return (
    <form noValidate onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <FieldGroup className="gap-4">
        <Controller
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="auth-register-email">邮箱</FieldLabel>
              <div className="relative">
                <Mail className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  {...field}
                  id="auth-register-email"
                  type="email"
                  placeholder="you@example.com"
                  autoComplete="email"
                  className="pl-9"
                  aria-invalid={fieldState.invalid}
                />
              </div>
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="auth-register-password">密码</FieldLabel>
              <PasswordInput
                {...field}
                id="auth-register-password"
                placeholder="至少 6 个字符"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <Field className="gap-1.5" data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="auth-register-confirm">确认密码</FieldLabel>
              <PasswordInput
                {...field}
                id="auth-register-confirm"
                placeholder="再次输入密码"
                autoComplete="new-password"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Controller
          control={form.control}
          name="agree"
          render={({ field, fieldState }) => (
            <Field orientation="horizontal" data-invalid={fieldState.invalid}>
              <Checkbox
                id="auth-register-agree"
                name={field.name}
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(Boolean(checked))}
                aria-invalid={fieldState.invalid}
              />
              <FieldContent>
                <FieldLabel htmlFor="auth-register-agree" className="font-normal">
                  我已阅读并同意
                  <button type="button" className="mx-0.5 text-primary underline-offset-4 hover:underline">
                    服务条款
                  </button>
                  和
                  <button type="button" className="mx-0.5 text-primary underline-offset-4 hover:underline">
                    隐私政策
                  </button>
                </FieldLabel>
                {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
              </FieldContent>
            </Field>
          )}
        />
      </FieldGroup>
      <Button className="w-full" type="submit">
        注册
      </Button>
    </form>
  );
}
