import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface PasswordFormProps {
    value: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    error?: string;
}

export default function PasswordForm({ value, onChange, error }: PasswordFormProps) {
    return (
        <>
            <Input
                id="password-input"
                className={`border ${error ? "border-destructive/80 text-destructive" : ""} focus-visible:border-destructive/80 focus-visible:ring-destructive/30`}
                placeholder="Password"
                type="password"
                value={value}
                onChange={onChange}
            />
            {error && (
                <p className="mt-2 text-xs text-destructive" role="alert" aria-live="polite">
                    {error}
                </p>
            )}
        </>
    );
}
