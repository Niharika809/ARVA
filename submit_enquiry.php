<?php
/**
 * ARVA – Marketing Beyond Limits
 * Secure Enquiry Submission Handler
 * Parent Company: STRINT
 */

header('Content-Type: application/json; charset=utf-8');

// Ensure POST request
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['status' => 'error', 'message' => 'Method not allowed.']);
    exit;
}

// Read JSON input or POST form fields
$raw_input = file_get_contents('php://input');
$data = json_decode($raw_input, true);

if (!$data) {
    $data = $_POST;
}

$name    = isset($data['name']) ? trim(strip_tags($data['name'])) : '';
$email   = isset($data['email']) ? filter_var(trim($data['email']), FILTER_SANITIZE_EMAIL) : '';
$phone   = isset($data['phone']) ? trim(strip_tags($data['phone'])) : '';
$service = isset($data['service']) ? trim(strip_tags($data['service'])) : 'General Enquiry';
$message = isset($data['message']) ? trim(strip_tags($data['message'])) : '';

if (empty($name) || empty($email) || empty($phone)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Required fields missing: Name, Email, or Phone.']);
    exit;
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['status' => 'error', 'message' => 'Invalid email address format.']);
    exit;
}

$enquiry = [
    'id'        => 'ARVA-' . date('Ymd') . '-' . mt_rand(1000, 9999),
    'timestamp' => date('Y-m-d H:i:s'),
    'name'      => $name,
    'email'     => $email,
    'phone'     => $phone,
    'service'   => $service,
    'message'   => $message,
    'client_ip' => $_SERVER['REMOTE_ADDR'] ?? '127.0.0.1'
];

$file = __DIR__ . '/enquiries.json';
$existing = [];

if (file_exists($file)) {
    $content = file_get_contents($file);
    $existing = json_decode($content, true) ?: [];
}

array_unshift($existing, $enquiry);
file_put_contents($file, json_encode($existing, JSON_PRETTY_PRINT | JSON_UNESCAPED_SLASHES));

echo json_encode([
    'status'  => 'success',
    'message' => 'Enquiry recorded successfully.',
    'data'    => $enquiry
]);
