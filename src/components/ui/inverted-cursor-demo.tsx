import { Cursor } from './inverted-cursor';

export default function CursorDemo() {
  return (
    <div className="relative h-96 w-full overflow-hidden">
      <Cursor inverted />
      <main className="flex h-full items-center justify-center">
        <h1 className="select-none text-4xl font-extrabold">Move your mouse</h1>
      </main>
    </div>
  );
}
