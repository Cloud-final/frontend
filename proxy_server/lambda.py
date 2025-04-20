import json
import urllib.request  # Import urllib to make HTTP requests

def lambda_handler(event, context):
    '''
    This Lambda function acts as a proxy that receives an HTTPS POST request (via a Lambda Function URL).
    It extracts a ECS backend URL from the request POST body, combines it with the incoming request path,
    and forwards the request as an HTTP GET to the specified ECS's load balancer URL.

    This allows secure HTTPS communication from the client to Lambda, while internally making an HTTP request
    to a backend service. The response from the backend is returned as the Lambda's response.
    '''
    print("Event:", json.dumps(event, indent=2))
    print("Context:", context)

    # Get ECS url from the request body here
    body = json.loads(event.get("body", "{}"))
    backend_url = body.get("backend_url")
    print("Received backend_url:", backend_url)
    if not backend_url:
        return {
            'statusCode': 400,
            'body': json.dumps({"error": "backend_url not provided"})
        }

    new_url = backend_url[:-1] + event.get("rawPath", "") 
    print("New URL:", new_url)

    try:
        with urllib.request.urlopen(new_url) as response:
            response_data = response.read().decode('utf-8')
            
            try:
                json_response = json.loads(response_data)
            except json.JSONDecodeError:
                json_response = response_data  
            return {
                'statusCode': 200,
                'body': json.dumps(json_response)
            }

    except urllib.error.HTTPError as e:
        # For HTTP errors 
        print(f"HTTP Error: {e.code}")
        return {
            'statusCode': e.code,
            'body': json.dumps({"error": e.reason})
        }
    except urllib.error.URLError as e:
        # URL errors 
        print(f"URL Error: {e.reason}")
        return {
            'statusCode': 500,
            'body': json.dumps({"error": "Request failed", "message": str(e)})
        }
    except Exception as e:
        # Catch others
        print(f"Unexpected Error: {str(e)}")
        return {
            'statusCode': 500,
            'body': json.dumps({"error": "Unexpected error", "message": str(e)})
        }
