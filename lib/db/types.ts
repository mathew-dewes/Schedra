export type Business = {
    id: string,
    name: string;
    slug: string;
    description: string | null;
    availability: {
        day_of_week: number;
        is_active: boolean | null;
        start_time: string;
        end_time: string;
    }[];
    services: {
        id: string
        name: string;
        description: string;
        duration_minutes: number;
        price: number;
    }[];

};


export type Services = {
id: string;
name: string;
description: string;
duration_minutes: number;
price: number;
  
}[] | []