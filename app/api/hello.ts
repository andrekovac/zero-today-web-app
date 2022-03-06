import { BlitzApiHandler, BlitzApiRequest, BlitzApiResponse } from "blitz"

import Cors from "cors"

// Initializing the cors middleware
const cors = Cors({
  methods: ["GET", "HEAD"],
})

// Helper method to wait for a middleware to execute before continuing
// And to throw an error when an error happens in a middleware
function runMiddleware(req: BlitzApiRequest, res: BlitzApiResponse, fn: (...args: any[]) => void) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: unknown) => {
      if (result instanceof Error) {
        return reject(result)
      }

      return resolve(result)
    })
  })
}

const handler: BlitzApiHandler = async (req, res) => {
  // Run the middleware
  await runMiddleware(req, res, cors)

  res.statusCode = 200
  res.setHeader("Content-Type", "application/json")
  res.end(JSON.stringify({ name: "John Doe" }))
}

export default handler
