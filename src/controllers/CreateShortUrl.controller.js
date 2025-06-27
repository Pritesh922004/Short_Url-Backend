import { CreateNanoID } from "../service/CreateNoneID.service.js";
import { StoreShortUrl } from "../Dao/ShortUrlQuerys.js"
import { FindUrl } from "../Dao/ShortUrlQuerys.js";
import { CheckShortUrl } from "../Dao/ShortUrlQuerys.js";
import { validationResult } from "express-validator";


export const CreateShortUrl = async (req, res) => {
    const Result = validationResult(req);

    if (!Result.isEmpty()) return res.send({ error: Result.array() });

    const { url, slug } = req.body;
    let ShortUrl;

    slug ? ShortUrl = slug : ShortUrl = CreateNanoID(6);

    const hasShortUrl = await CheckShortUrl(ShortUrl);

    if (hasShortUrl) return res.status(400).json({error:"Already Exists"});

    const data = await StoreShortUrl(url, ShortUrl, req.user?.id);

    res.status(200).json({ ShortUrl: process.env.Domain + data.Short_Url });
}



export const RedirectToUrl = async (req, res) => {
    const Result = validationResult(req);

    if (!Result.isEmpty()) return res.send({ error: Result.array() });

    const { id } = req.params;

    const data = await FindUrl(id);

    if (!data) return res.status(404).send("Not Found");

    res.redirect(data.Url);
}