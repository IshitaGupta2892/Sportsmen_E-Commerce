interface CategoryHeaderProps {
  title: string
  description: string
  image: string
}

export function CategoryHeader({ title, description, image }: CategoryHeaderProps) {
  return (
    <section className="relative h-64 md:h-80 flex items-center justify-center overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `url('${image}')`,
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-balance">{title}</h1>
        <p className="text-lg md:text-xl text-pretty max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>
    </section>
  )
}
