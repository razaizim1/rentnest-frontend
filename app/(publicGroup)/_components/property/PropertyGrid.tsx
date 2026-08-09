import { IProperty } from "@/lib/types";
import { PropertyCard } from "./PropertyCard";

export const PropertyGrid = (properties: { properties: IProperty[] }) => {
    console.log(properties);
    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {properties.properties.map((property) => (
                <PropertyCard
                    key={property.id}
                    property={property}
                />
            ))}
        </div>
    );
}

// import { IProperty } from "@/lib/types";
// import { PropertyCard } from "./PropertyCard";

// export const PropertyGrid = ({
//     properties,
// }: {
//     properties: IProperty[];
// }) => {
//     return (
//         <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
//             {properties.map((property) => (
//                 <PropertyCard
//                     key={property.id}
//                     property={property}
//                 />
//             ))}
//         </div>
//     );
// };