import Image from "next/image"
export default function Footer(){
    return(
        <div className="bg-black py-12 px-4">
            <div className="container mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <div className="h-6 w-6 "></div>
            <Image
            src="/logo.jpg"
            alt="logo"
            width={50}
            height={50}
            />
          </div>
          <p className="text-white">© 2024 One-7. Premium cricket sportswear for peak performance.</p>
        </div>


        </div>
    )
}