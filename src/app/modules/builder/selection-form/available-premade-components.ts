interface PremadeComponent {
    name: string;
    componentName: string;
    inputs: { [key: string]: "" | ""[] }[];
    imageURLs: { [key: string]: string };
}

export const availablePremadeComponents: PremadeComponent[] = [
    {
        name: "Navigational bar",
        componentName: "NavbarComponent",
        inputs: [
            {
                brandText: "",
            },
            {
                elements: [""],
            },
            {
                dropdownText: "",
            },
            {
                dropdownElements: [""],
            },
        ],
        imageURLs: {
            preview: "assets/components-preview/navbar-preview.png",
        },
    },
    {
        name: "Simple text section",
        componentName: "SimpleTextSectionComponent",
        inputs: [
            { heading: "" },
            {
                content: "",
            },
        ],
        imageURLs: {
            preview: "assets/components-preview/simple-text-section.png",
        },
    },
];
