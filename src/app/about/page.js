import { Button } from "@/components/ui/button"
export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start w-full">
        <div className="flex gap-4 items-center flex-col sm:flex-col w-full">
            <h1 className="text-4xl font-bold text-center">Welcome to Junera</h1>
            <p className="text-center text-gray-600">A new way to find STEM jobs.</p>
            <div className="flex gap-4">
                <Button className="w-full">Get Started</Button>
                <Button className="w-full" variant="outline">Learn More</Button>
            </div>
      <div>
    </div>
        </div>
      </main>
    </div>
  );
}
