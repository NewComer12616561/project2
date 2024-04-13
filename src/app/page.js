
import Hero from "../components/layout/Hero";
import HomeMenu from "../components/layout/HomeMenu";
import SectionHeader from "../components/layout/SectionHeaders";



export default function Home() {
  return (
    <>
 
  <Hero/>
  <HomeMenu />
  <section className="text-center my-16 " id="about">
    <SectionHeader
    subHeader={'Our story'}
    mainHeader={'About us'} />
   
    <div className="text-gray-500 max-w-md mx-auto mt-4 
    flex flex-col gap-4">
    <p>text text text text text text page.js line 21 </p>
    <p>Blah blah blah page.js line 22</p>
    <p>Blah blah blah page.js line 23</p>
    </div>

  </section>
  
  <section className="text-center my-8" id="contact">
    <SectionHeader
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
