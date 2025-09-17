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
        {/* Blue→orange gradient overlay for sporty category header */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/70 via-primary/30 to-accent/60 mix-blend-multiply"></div>
        <div className="absolute -top-16 -right-16 h-56 w-56 rotate-12 bg-accent/30 blur-2xl rounded-full" />
        <div className="absolute -bottom-16 -left-16 h-56 w-56 -rotate-12 bg-primary/30 blur-2xl rounded-full" />
      </div>

      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="font-serif text-3xl md:text-5xl font-bold mb-4 text-balance">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
            {title}
          </span>
        </h1>
        <p className="text-lg md:text-xl text-pretty max-w-2xl mx-auto leading-relaxed">{description}</p>
      </div>
    </section>
  )
}
