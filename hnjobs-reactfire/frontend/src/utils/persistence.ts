import Item from "../models/Item"
import { pipe, Effect } from "effect"
import axios from 'axios'

const writeComments = (items: Item[][], onlyFirst = true): Effect.Effect<void, Error> => {
    if(items === undefined || items.length == 0){
        return Effect.succeed({})
    } 
    const itemData: Item[] = onlyFirst ? items[0] : items.flat()
    const data = itemData.map(item => item.text).join("~~~---~~~")
    return Effect.tryPromise(() => axios.post("http://localhost:5179/comments/", {"data": data}))
}

const getComments = (): Effect.Effect<Item[], Error> => pipe(
    Effect.tryPromise(() => axios.get("http://localhost:5179/comments/")),
    Effect.map((response) => response.data["data"].join("").split("~~~---~~~")),
    Effect.tap((response: string[]) => console.log("Mock response: ", response)),
    Effect.map((comments: string[]) => comments.map<Item>(commentText => { return {
        text: commentText,
        by: "mock",
        descendants: 0,
        id: Math.random() * 1000000,
        score: 0,
        time: 0,
        url: "http://localhost"
    }}))
)

export {writeComments, getComments}