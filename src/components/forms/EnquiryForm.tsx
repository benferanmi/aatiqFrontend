import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import {
  enquirySchema,
  type EnquiryInput,
  type EnquiryOutput,
} from "@/lib/validation";
import { api } from "@/lib/client";
import { toast } from "sonner";
import { CheckCircle2 } from "lucide-react";

interface Props {
  productId?: string;
  productTitle?: string;
  onSuccess?: () => void;
  compact?: boolean;
}

export default function EnquiryForm({
  productId,
  productTitle,
  onSuccess,
  compact,
}: Props) {
  const [submitted, setSubmitted] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<EnquiryInput, unknown, EnquiryOutput>({
    resolver: zodResolver(enquirySchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      address: "",
      message: "",
      productId: productId ?? "",
    },
  });

  const onSubmit = async (data: EnquiryOutput) => {
    try {
      await api.submitEnquiry({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        phone: data.phone,
        message: data.message,
        address: data.address || undefined,
        productId: data.productId || undefined,
      });
      toast.success("Enquiry received");
      reset();
      setSubmitted(true);
      onSuccess?.();
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Could not send");
    }
  };

  if (submitted) {
    return (
      <div className="text-center py-10 px-4">
        <CheckCircle2
          className="h-12 w-12 mx-auto mb-6 text-gold"
          strokeWidth={1.2}
        />
        <h3 className="font-display text-3xl md:text-4xl">Thank you</h3>
        <p className="eyebrow-gold mt-3">
          The atelier has received your enquiry
        </p>
        <p className="mt-6 max-w-md mx-auto text-muted-foreground text-sm leading-relaxed">
          A member of our team will respond personally within one business day.
          If your enquiry concerns a specific piece, we will hold it pending
          your reply.
        </p>
        <button
          onClick={() => setSubmitted(false)}
          className="mt-8 font-mono text-[11px] uppercase tracking-widest border border-foreground px-5 py-3 hover:bg-foreground hover:text-background transition-colors"
        >
          Submit another
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      {productTitle && (
        <div className="border-l-2 border-gold pl-4 py-2">
          <p className="eyebrow-gold">Enquiring about</p>
          <p className="font-display text-xl mt-1">{productTitle}</p>
        </div>
      )}

      <div className={compact ? "space-y-5" : "grid sm:grid-cols-2 gap-5"}>
        <Field label="First name" error={errors.firstName?.message}>
          <input
            {...register("firstName")}
            className={inputCls}
            autoComplete="given-name"
          />
        </Field>
        <Field label="Last name" error={errors.lastName?.message}>
          <input
            {...register("lastName")}
            className={inputCls}
            autoComplete="family-name"
          />
        </Field>
      </div>

      <div className={compact ? "space-y-5" : "grid sm:grid-cols-2 gap-5"}>
        <Field label="Email" error={errors.email?.message}>
          <input
            type="email"
            {...register("email")}
            className={inputCls}
            autoComplete="email"
          />
        </Field>
        <Field label="Phone" error={errors.phone?.message}>
          <input
            type="tel"
            {...register("phone")}
            className={inputCls}
            autoComplete="tel"
          />
        </Field>
      </div>

      <Field label="Address (optional)" error={errors.address?.message}>
        <input
          {...register("address")}
          className={inputCls}
          autoComplete="street-address"
        />
      </Field>

      <Field label="Message" error={errors.message?.message}>
        <textarea
          {...register("message")}
          rows={5}
          className={inputCls + " resize-none"}
          placeholder="Tell us about your interest in this piece, or what you are searching for…"
        />
      </Field>

      <input type="hidden" {...register("productId")} />

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full font-mono text-[11px] uppercase tracking-widest bg-foreground text-background py-4 hover:bg-gold transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Sending…" : "Submit enquiry"}
      </button>

      <p className="font-mono text-xs uppercase tracking-widest text-muted-foreground text-center">
        Replies within one business day · We never share your details
      </p>
    </form>
  );
}

const inputCls =
  "w-full bg-transparent border-0 border-b border-hairline focus:border-gold focus:outline-none focus:ring-0 py-3 text-base placeholder:text-muted-foreground/60 transition-colors";

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block eyebrow mb-1">{label}</span>
      {children}
      {error && (
        <span className="block mt-1.5 text-xs text-destructive">{error}</span>
      )}
    </label>
  );
}
