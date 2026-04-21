from models import Products
from database import engine, SessionLocal
from sqlalchemy.orm import Session

products_data = [
    {
        "name": "Vanilla Drift",
        "flavors": ["Vanilla", "Caramel", "Toffee"],
        "description": "A smooth and creamy medium roast with a comforting blend of sweet vanilla, buttery caramel, and a hint of warm toffee.",
        "size": "12oz",
        "price": 14.99
    },
    {
        "name": "Midnight Ember",
        "flavors": ["Dark Chocolate", "Smoky", "Molasses"],
        "description": "A bold, dark roast with deep flavors of dark chocolate, smoky undertones, and a rich molasses finish.",
        "size": "16oz",
        "price": 16.49
    },
    {
        "name": "Citrus Bloom",
        "flavors": ["Orange Zest", "Floral", "Lemon"],
        "description": "A bright and zesty light roast with floral notes and bursts of citrus that wake up your morning.",
        "size": "12oz",
        "price": 13.79
    },
    {
        "name": "Hazel Grove",
        "flavors": ["Hazelnut", "Brown Sugar", "Cocoa"],
        "description": "A mellow medium roast featuring warm hazelnut notes layered with brown sugar and a light cocoa finish.",
        "size": "12oz",
        "price": 14.25
    },
    {
        "name": "Alpine Frost",
        "flavors": ["Peppermint", "Cocoa", "Cedar"],
        "description": "A winter-inspired roast with brisk peppermint, rich cocoa, and subtle cedar aromas — perfect for cold mornings.",
        "size": "10oz",
        "price": 15.95
    }
]
 
def load_fixtures():
    db: Session = SessionLocal()

    # Clear existing data (optional: for development only)
    db.query(Products).delete()

    # Create and add products
    for product in products_data:
        new_product = Products(
            name=product["name"],
            flavors=product["flavors"],
            description=product["description"],
            size=product["size"],
            price=product["price"]
        )
        db.add(new_product)

    db.commit()
    db.close()
    print("✅ Fixtures loaded successfully.")

if __name__ == "__main__":
    load_fixtures()