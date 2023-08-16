"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Coupon_1 = require("@/domain/entity/Coupon");
const DefaultFreightCalculator_1 = require("@/domain/entity/DefaultFreightCalculator");
const FixedFreightCalculator_1 = require("@/domain/entity/FixedFreightCalculator");
const Item_1 = require("@/domain/entity/Item");
const Order_1 = require("@/domain/entity/Order");
test("Deve criar um pedido vazio com CPF válido", () => {
    const cpf = "839.435.452-10";
    const order = new Order_1.Order(cpf);
    const total = order.getTotal();
    expect(total).toBe(0);
});
test("Deve tentar criar um pedido vazio com CPF inválido", () => {
    const cpf = "111.111.111-11";
    expect(() => new Order_1.Order(cpf)).toThrow(new Error("Invalid cpf"));
});
test("Deve criar um pedido com 3 itens", () => {
    const cpf = "839.435.452-10";
    const order = new Order_1.Order(cpf);
    order.addItem(new Item_1.Item(1, "Música", "CD", 30), 3);
    order.addItem(new Item_1.Item(2, "Vídeo", "DVD", 50), 1);
    order.addItem(new Item_1.Item(3, "Vídeo", "VHS", 10), 2);
    const total = order.getTotal();
    expect(total).toBe(160);
});
test("Deve criar um pedido com 3 itens com um cupom de desconto", () => {
    const cpf = "839.435.452-10";
    const order = new Order_1.Order(cpf);
    order.addItem(new Item_1.Item(1, "Música", "CD", 30), 3);
    order.addItem(new Item_1.Item(2, "Vídeo", "DVD", 50), 1);
    order.addItem(new Item_1.Item(3, "Vídeo", "VHS", 10), 2);
    order.addCoupon(new Coupon_1.Coupon("VALE20", 20));
    const total = order.getTotal();
    expect(total).toBe(128);
});
test("Deve criar um pedido com 3 itens com um cupom de desconto expirado", () => {
    const cpf = "839.435.452-10";
    const order = new Order_1.Order(cpf, new Date("2023-01-01"));
    order.addItem(new Item_1.Item(1, "Música", "CD", 30), 3);
    order.addItem(new Item_1.Item(2, "Vídeo", "DVD", 50), 1);
    order.addItem(new Item_1.Item(3, "Vídeo", "VHS", 10), 2);
    order.addCoupon(new Coupon_1.Coupon("VALE20", 20, new Date("2022-01-01")));
    const total = order.getTotal();
    expect(total).toBe(160);
});
test("Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia default", () => {
    const cpf = "839.435.452-10";
    const order = new Order_1.Order(cpf, new Date(), new DefaultFreightCalculator_1.DefaultFreightCalculator());
    order.addItem(new Item_1.Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item_1.Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item_1.Item(6, "Acessórios", "Cabo", 30, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    expect(freight).toBe(260);
});
test("Deve criar um pedido com 3 itens com o cálculo do frete com a estratégia fixed", () => {
    const cpf = "839.435.452-10";
    const order = new Order_1.Order(cpf, new Date(), new FixedFreightCalculator_1.FixedFreightCalculator());
    order.addItem(new Item_1.Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item_1.Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item_1.Item(6, "Acessórios", "Cabo", 30, 10, 10, 10, 0.9), 3);
    const freight = order.getFreight();
    expect(freight).toBe(50);
});
test("Deve criar um pedido com codigo", () => {
    const cpf = "839.435.452-10";
    const order = new Order_1.Order(cpf, new Date(), new FixedFreightCalculator_1.FixedFreightCalculator());
    order.addItem(new Item_1.Item(4, "Instrumentos Musicais", "Guitarra", 1000, 100, 30, 10, 3), 1);
    order.addItem(new Item_1.Item(5, "Instrumentos Musicais", "Amplificador", 5000, 100, 50, 50, 20), 1);
    order.addItem(new Item_1.Item(6, "Acessórios", "Cabo", 30, 10, 10, 10, 0.9), 3);
    const code = order.getCode();
    expect(code).toBe("202300000001");
});
