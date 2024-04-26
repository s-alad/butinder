import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from "body-parser";
import vision from "@google-cloud/vision";

dotenv.config();

const port = process.env.PORT || 5000;

const app: Express = express();

app.use(cors());
app.use(bodyParser.json({ limit: "24mb" }));


const client = new vision.ImageAnnotatorClient({
    keyFilename: "./butinder.json",
});

app.get("/", (req: Request, res: Response) => {
    res.send("/");
});

app.post("/check-explicit", async (req: Request, res: Response) => {

    console.log("-----------------");

    try {
        let base64Data = req.body.image;
        if (!base64Data) {
            console.log("No image found");
            return res.status(400).json("No image found");
        }
        
        base64Data = base64Data.replace(/^data:image\/\w+;base64,/, '');
        const safesearch = await client.safeSearchDetection(
            { image: { content: base64Data } }
        );
        const detections = safesearch[0].safeSearchAnnotation;
        console.log(detections);

        if (!detections) {
            console.log("No detections found");
            res.status(200).json("No detections found");
            return;
        }

        const { adult, medical, spoof, violence, racy } = detections;

        if (adult === "VERY_LIKELY" || adult === "LIKELY" || medical === "VERY_LIKELY" || medical === "LIKELY") {
            console.log("Image contains adult or medical content");
            res.status(400).json("Image contains adult or medical content");
            return;
        }

        console.log("Image is safe");
        return res.status(200).json("No detections found");
    } catch (error) {
        console.log(error);
        res.status(500).json("Internal server error");
    }
})

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});