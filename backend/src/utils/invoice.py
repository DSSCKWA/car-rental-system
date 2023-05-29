import os
import random
from datetime import date

from InvoiceGenerator.api import Invoice, Item, Client, Provider, Creator

from InvoiceGenerator.pdf import SimpleInvoice


def generate_invoice(name, surname, brand, model, vehicle_cost, insurance_cost, penalty_charges):
    os.environ["INVOICE_LANG"] = "en"

    client = Client(f"{name} {surname}")

    provider = Provider(
        'Car Rental System', bank_account='1234-45678-001234', bank_code='0000')

    creator = Creator('Manager Manager')

    invoice = Invoice(client, provider, creator)

    invoice.add_item(
        Item(1, vehicle_cost, description=f'{brand} {model} rental'))
    if insurance_cost != 0:
        invoice.add_item(Item(1, insurance_cost,
                         description="Additional insurance"))
    if penalty_charges != 0:
        invoice.add_item(
            Item(1, penalty_charges, description="Penalties"))

    invoice.date = date.today()
    invoice.currency = "¥"

    invoice.number = random.randint(10000000, 100000000)

    doc = SimpleInvoice(invoice)

    pdfPath = f"{name}_{surname}_{brand}_{model}_invoice.pdf"
    doc.gen(pdfPath, generate_qr_code=False)
    return pdfPath
