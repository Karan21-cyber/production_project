"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const stripe_1 = __importDefault(require("stripe"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY, {
    apiVersion: "2023-10-16", // Use the specified version or the latest version available at the time
});
function createSubscriptionProduct() {
    return __awaiter(this, void 0, void 0, function* () {
        // console.log(process.env.STRIPE_SECRET_KEY);
        try {
            const product = yield stripe.products.create({
                name: "Starter Subscription",
                description: "$12/Month subscription",
            });
            const price = yield stripe.prices.create({
                unit_amount: 20,
                currency: "usd",
                recurring: {
                    interval: "month",
                },
                product: product.id,
            });
            console.log("Success! Here is your starter subscription product id: " + product.id);
            console.log("Success! Here is your starter subscription price id: " + price.id);
        }
        catch (error) {
            console.error("Error creating subscription product:", error);
        }
    });
}
exports.default = createSubscriptionProduct;
