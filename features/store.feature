Feature: Gestión de Ordenes de Compra en Petstore
    Como usuario de la tienda de mascotas
    Quiero gestionar las ordenes de compra
    Para asegurar el flujo de ventas e inventario

    Scenario: Ciclo de vida completo de una orden (Crear, Consultar, Verificar Inventario, Eliminar)
        Given que tengo los datos para una nueva orden de compra
        When creo una orden de compra en la tienda
        Then la orden debe ser creada exitosamente con los datos correctos
        When busco la orden de compra creada por su ID
        Then debo obtener los detalles de la orden correctamente
        When verifico el inventario de la tienda
        Then el inventario debe contener items con status "sold"
        When elimino la orden de compra creada
        Then al buscar la orden nuevamente debo recibir un error 404