import { clsx } from "clsx";

export default function FormBox({
  subtitle,
  loading,
  children,
}: {
  subtitle?: string;
  loading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div
      className={clsx(
        "self-start md:self-center relative",
        "box w-full md:w-[400px] p-4 md:p-6",
        "md:bg-base-200 border-0 border-muted rounded-xl",
        "space-y-4"
      )}>
      <header>
        <h1 className="text-center text-4xl">{__APP_NAME__}</h1>
        {subtitle ? (
          <h2 className="text-center text-lg">{subtitle}</h2>
        ) : undefined}
      </header>
      <section>{children}</section>
      {loading ? (
        <div className="absolute inset-0 rounded-xl bg-base-200 opacity-90 flex center items-center justify-center">
          <span className="loading loading-spinner loading-sm"></span>
        </div>
      ) : undefined}
    </div>
  );
}
