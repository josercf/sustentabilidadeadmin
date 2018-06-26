export class Content {
    Title: string;
    Detail: string
}

export class Position {
    Lat: number;
    Lng: number
}

export class Place {
    Name: string;
    Description: string;
    Content: Content[] = [];
    ImageDescripton: string;
    Image: string;
    Phone: string;
    Location: string;
    Position: Position
}