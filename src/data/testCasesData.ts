import { EpicTreeNode, TestCaseNode } from "@/types";

export const tc801: TestCaseNode = {
  id: "tc-801",
  code: "TC-801",
  title: "Full Refund Success via Stripe API",
  description:
    "Verifies that a valid refund request for the total transaction amount processes successfully, updates the internal ledger, and sends the appropriate webhook event.",
  status: "Ready for Review",
  ragGenUnlocked: true,
  ragGenReason: "RAG Gen: Unlocked (US Approved)",
  preconditions: [
    "User holds a valid Stripe Customer ID.",
    "Transaction #TXN-90210 is in 'Settled' state.",
    "API Bearer token has refund scope enabled.",
  ],
  links: [
    { icon: "link", label: "US-1042: Process Refund", tag: "Parent", variant: "link" },
    { icon: "architecture", label: "Stripe API v2.4", tag: "System", variant: "system" },
  ],
  steps: [
    {
      id: "step-1",
      order: 1,
      action: "POST to `/v1/refunds` with valid `charge_id` and full `amount`.",
      expected: "HTTP 200 OK returned. Refund object status is `succeeded`.",
    },
    {
      id: "step-2",
      order: 2,
      action: "Query internal ledger database for `transaction_id`.",
      expected: '{"ledger_status": "refunded", "balance_deducted": true}',
      expectedIsCode: true,
    },
    {
      id: "step-3",
      order: 3,
      action: "Listen for `charge.refunded` webhook payload on endpoint.",
      expected: "Webhook received within 2000ms containing matching `charge_id`.",
    },
  ],
};

const tc802: TestCaseNode = {
  id: "tc-802",
  code: "TC-802",
  title: "Partial Refund Denied",
  description:
    "Verifies that a refund request for less than the full transaction amount is correctly rejected when partial refunds are not enabled for the merchant account.",
  status: "Draft",
  ragGenUnlocked: true,
  ragGenReason: "RAG Gen: Unlocked (US Approved)",
  preconditions: [
    "Merchant account has partial refunds disabled.",
    "Transaction #TXN-90210 is in 'Settled' state.",
  ],
  links: [{ icon: "link", label: "US-1042: Process Refund", tag: "Parent", variant: "link" }],
  steps: [
    {
      id: "step-1",
      order: 1,
      action: "POST to `/v1/refunds` with `amount` less than the original charge.",
      expected: "HTTP 400 Bad Request returned with error code `partial_refund_disabled`.",
    },
  ],
};

export const testCasesTree: EpicTreeNode[] = [
  {
    id: "epic-42",
    code: "Epic-42",
    title: "Payment Gateway",
    features: [
      {
        id: "feature-stripe",
        title: "Stripe Integration",
        userStories: [
          {
            id: "us-1042",
            code: "US-1042",
            title: "Process Refund",
            approvalTag: "Appr",
            testCases: [tc801, tc802],
          },
          {
            id: "us-1043",
            code: "US-1043",
            title: "Multi-Currency",
            approvalTag: "Draft",
            locked: true,
            lockedReason: "Locked: Parent story not approved",
            testCases: [],
          },
        ],
      },
    ],
  },
];
