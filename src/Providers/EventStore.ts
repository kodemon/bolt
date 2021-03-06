import { container, Descriptor, Store } from "cmdo-events";
import { nanoid } from "nanoid";

import { collection } from "../Lib/Collections";
import { Event, events } from "../Stores";

export const store = new (class MongoEventStore extends Store<Event> {
  public async insert({ id, streams, event }: Descriptor) {
    const isDuplicate = await collection.events.count({
      streams: { $in: streams },
      "event.data.hash": event.data.hash,
      "event.meta.created": event.meta.created
    });
    if (!isDuplicate) {
      return collection.events.insertOne({ id, streams, event });
    }
  }

  public async find(filter: any): Promise<Event[]> {
    return collection.events
      .find(filter)
      .sort({
        "event.meta.created": 1
      })
      .toArray()
      .then((events) => events.map((descriptor) => this.toEvent(descriptor)));
  }

  public async outdated({ streams, event }: Descriptor) {
    const count = await collection.events.count({
      streams: {
        $in: streams
      },
      "event.type": event.type,
      "event.data.hash": event.data.hash,
      "event.meta.created": {
        $gt: event.meta.created
      }
    });
    return count > 0;
  }

  public descriptor(streams: string[], event: Event): Descriptor {
    return {
      id: nanoid(),
      streams,
      event: event.toJSON()
    };
  }
})(events);

container.set("Store", store);
