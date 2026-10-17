
 // Factory Method Design Pattern - Logistics System

// Transport Interface
interface Transport {
    deliver(cargo: string): void;
    costPerKm(): number;
}

// Truck Implementation
class Truck implements Transport {
    deliver(cargo: string): void {
        console.log(`🚚 Delivering ${cargo} by road`);
    }

    costPerKm(): number {
        return 2;
    }
}

// Ship Implementation
class Ship implements Transport {
    deliver(cargo: string): void {
        console.log(`🚢 Delivering ${cargo} by sea`);
    }

    costPerKm(): number {
        return 1.5;
    }
}

// Airplane Implementation
class Airplane implements Transport {
    deliver(cargo: string): void {
        console.log(`✈️ Delivering ${cargo} by air`);
    }

    costPerKm(): number {
        return 5;
    }
}

// Abstract Logistics Class
abstract class Logistics {
    abstract createTransport(): Transport;

    planDelivery(cargo: string): void {
        console.log(`Planning delivery of ${cargo}...`);

        const transport = this.createTransport();
        transport.deliver(cargo);

        console.log("Delivery logged.");
    }

    estimateCost(km: number): number {
        const transport = this.createTransport();
        return km * transport.costPerKm();
    }
}

// Road Logistics
class RoadLogistics extends Logistics {
    override createTransport(): Transport {
        return new Truck();
    }
}

// Sea Logistics
class SeaLogistics extends Logistics {
    override createTransport(): Transport {
        return new Ship();
    }
}

// Air Logistics
class AirLogistics extends Logistics {
    override createTransport(): Transport {
        return new Airplane();
    }
}

// Testing Road Delivery
const road = new RoadLogistics();
road.planDelivery("cement");
console.log("Road cost:", road.estimateCost(100));

// Testing Sea Delivery
const sea = new SeaLogistics();
sea.planDelivery("rice");
console.log("Sea cost:", sea.estimateCost(100));

// Testing Air Delivery
const air = new AirLogistics();
air.planDelivery("electronics");
console.log("Air cost:", air.estimateCost(100));
