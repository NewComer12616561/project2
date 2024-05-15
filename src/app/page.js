
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeaders from "../components/layout/SectionHeaders";



export default function Home() {
  return (
    <>
 
  <Hero/>
  <HomeMenu />
  <section className="text-center my-16 " id="about">
    <SectionHeaders
    subHeader={'Our story'}
    mainHeader={'About us'} />
   
    <div className="text-gray-500 max-w-md mx-auto mt-4 
    flex flex-col gap-4">
    <p>This is a food ordering website</p>
    <p>Some of the feature in this website include:</p>
    <p>ordering food from menu or recommendation in homepage, payment for said food, cart,... </p>
    </div>

  </section>
  
  <section className="text-center my-8" id="contact">
    <SectionHeaders
    subHeader={'Don\'t hesitate'}
    mainHeader={'Contact us'} />
    
    <div className="mt-8 ">
    <a className="text-4xl underline text-gray-500" href="tel:+84923219468">
      +84 923 219 468</a>
    </div>

  </section>


  
    </>
  );
}
