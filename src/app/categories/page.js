import { UserTabs } from "@/components/layout/UserTabs";
import { User } from "@/models/User";

export default function CategoriesPage(){
    return(
        <section className="mt-8">
            <UserTabs isAdmin={true}/>
            categories
        </section>
    );
}