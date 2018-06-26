export class Content {
    title: string;
    detail: string
}

export class Position {
    lat: number;
    lng: number
}

export class Place {
    name: string;
    description: string;
    content: Content[] = [];
    imageDescripton: string;
    image: string;
    phone: string;
    location: string;
    position: Position
}