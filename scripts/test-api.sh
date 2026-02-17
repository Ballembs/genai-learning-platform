#!/bin/bash
# E2E API Test Script for GenAI Learning Platform
# Run: bash scripts/test-api.sh
# Requires: curl, jq, dev server running on localhost:3000

BASE="http://localhost:3000"
PASS=0
FAIL=0

echo "🧪 GenAI Learning Platform — API Tests"
echo "========================================"
echo ""

# Helper
test_endpoint() {
  local name="$1"
  local method="$2"
  local url="$3"
  local data="$4"
  local expect_status="$5"
  
  if [ "$method" = "GET" ]; then
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" "$url")
  else
    STATUS=$(curl -s -o /dev/null -w "%{http_code}" -X POST "$url" -H "Content-Type: application/json" -d "$data")
  fi
  
  if [ "$STATUS" = "$expect_status" ]; then
    echo "  ✅ $name (HTTP $STATUS)"
    PASS=$((PASS + 1))
  else
    echo "  ❌ $name — expected $expect_status, got $STATUS"
    FAIL=$((FAIL + 1))
  fi
}

echo "📄 Page Routes"
test_endpoint "Landing page" GET "$BASE/" "" "200"
test_endpoint "Course page" GET "$BASE/course" "" "200"
test_endpoint "Lesson 01" GET "$BASE/course/01-how-ai-works" "" "200"
test_endpoint "Lesson 02" GET "$BASE/course/02-prompt-engineering" "" "200"
test_endpoint "Lesson 03" GET "$BASE/course/03-embeddings" "" "200"
test_endpoint "Lesson 04" GET "$BASE/course/04-rag" "" "200"
test_endpoint "Lesson 05" GET "$BASE/course/05-agents" "" "200"
test_endpoint "Profile page" GET "$BASE/profile" "" "200"
test_endpoint "Sign in page" GET "$BASE/auth/signin" "" "200"
test_endpoint "Sign up page" GET "$BASE/auth/signup" "" "200"

echo ""
echo "🔌 API Endpoints (GET — info)"
test_endpoint "Chat API info" GET "$BASE/api/chat" "" "200"
test_endpoint "Deep dive API info" GET "$BASE/api/deep-dive" "" "200"
test_endpoint "Popup API info" GET "$BASE/api/popup" "" "200"

echo ""
echo "🔌 API Endpoints (POST — validation)"
test_endpoint "Chat — empty body" POST "$BASE/api/chat" '{}' "400"
test_endpoint "Deep dive — empty body" POST "$BASE/api/deep-dive" '{}' "400"
test_endpoint "Popup — empty body" POST "$BASE/api/popup" '{}' "400"

echo ""
echo "💬 Chat API (POST — valid request)"
CHAT_RESPONSE=$(curl -s -X POST "$BASE/api/chat" \
  -H "Content-Type: application/json" \
  -d '{
    "message": "What are tokens?",
    "context": {
      "currentPage": "/course/01-how-ai-works",
      "userLevel": "beginner",
      "recentExplorations": []
    },
    "history": []
  }')
if echo "$CHAT_RESPONSE" | jq -e '.message' > /dev/null 2>&1; then
  echo "  ✅ Chat returns message"
  PASS=$((PASS + 1))
else
  echo "  ❌ Chat response missing 'message' field"
  echo "     Response: $(echo $CHAT_RESPONSE | head -c 200)"
  FAIL=$((FAIL + 1))
fi

echo ""
echo "========================================"
echo "Results: $PASS passed, $FAIL failed"
if [ $FAIL -eq 0 ]; then
  echo "🎉 All tests passed!"
else
  echo "⚠️  Some tests failed"
  exit 1
fi
