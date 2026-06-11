import sys
import os
import subprocess

SERVICES = [("user-service", ["uvicorn", "main:app", "--port", "8000", "--reload"]),
            ("products-service", ["uvicorn", "main:app", "--port", "8001", "--reload"]),
            ("cart-service", ["uvicorn", "main:app", "--port", "8002", "--reload"]),
            # ("currency-converter", ["uvicorn", "main:app", "--port", "8003", "--reload"]),
            ]

def start_services():
    processes = []

    for service_dir, command in SERVICES:
        print(f"--- Starting {service_dir} ---")
        
        process = subprocess.Popen(
            command,
            cwd=os.path.join(os.getcwd(), service_dir),
            stdout=subprocess.PIPE,
            stderr=subprocess.PIPE,
            text=True
        )
        processes.append(process)
        print(f"{service_dir} started with PID {process.pid}")

    print("All services initiated. Press Ctrl+C to stop.")
    
    try:
        # Keep the script running to monitor services
        for p in processes:
            p.wait()
    except KeyboardInterrupt:
        print("\nStopping services...")
        for p in processes:
            p.terminate()
        print("All services stopped.")

if __name__ == "__main__":
    start_services()