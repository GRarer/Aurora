/* All images should be declared here so that they start loading as soon as the application starts
 */

const imageQueue: Promise<HTMLImageElement>[] = [];

function makeImage(src: string): HTMLImageElement {
    const img = new Image();
    const imagePromise = new Promise<HTMLImageElement>((resolve, reject) => {
        img.onload = () => resolve(img);
        // Don't break everything if an image can't be loaded
        img.onerror = () => resolve(img);
        img.src = src;
    });
    imageQueue.push(imagePromise);
    return img;
}

// UI images
export const HighlightSelectionImage = makeImage("assets/ui/highlight.png");

// tile textures
export const WastelandTexture1 = makeImage("assets/tiles/environment/wasteland1.png");
export const WastelandTexture2 = makeImage("assets/tiles/environment/wasteland2.png");
export const WastelandTexture3 = makeImage("assets/tiles/environment/wasteland3.png");
export const WastelandTexture4 = makeImage("assets/tiles/environment/wasteland4.png");
export const WastelandTexture5 = makeImage("assets/tiles/environment/wasteland5.png");
export const MountainTexture = makeImage("assets/tiles/environment/mountain.png");

export const RuinsTexture = makeImage("assets/tiles/alien/ruins.png");
export const MonolithTexture = makeImage("assets/tiles/alien/monolith.png");

export const HabitatTexture = makeImage("assets/tiles/colony/habitat.png");
export const SolarPanelsTexture = makeImage("assets/tiles/colony/solar_panels.png");
export const MiningFacilityTexture = makeImage("assets/tiles/colony/mining_facility.png");
export const LanderTexture = makeImage("assets/tiles/colony/lander.png");
export const GreenhouseTexture = makeImage("assets/tiles/colony/greenhouse.png");
export const RoadTexture = makeImage("assets/tiles/colony/roads.png");

export const ArcologyTexture = makeImage("assets/tiles/colony/arcology.png");
export const NuclearPlantTexture = makeImage("assets/tiles/colony/nuclear_plant.png");

export const AlignmentLabTexture = makeImage("assets/tiles/colony/lab_alignment.png");
export const EngineeringLabTexture = makeImage("assets/tiles/colony/lab_engineering.png");
export const PsychLabTexture = makeImage("assets/tiles/colony/lab_psych.png");
export const XenoLabTexture = makeImage("assets/tiles/colony/lab_xeno.png");

export async function preloadImages(): Promise<HTMLImageElement[]> {
    return Promise.all(imageQueue);
}
