# Triage Labels

The skills speak in terms of five canonical triage roles. This file maps those roles to the actual label strings used in this repo's issue tracker.

| Label in mattpocock/skills | Label in our tracker      | Meaning                                  |
| -------------------------- | ------------------------- | ---------------------------------------- |
| `needs-triage`             | `status:triage`           | Maintainer needs to evaluate this issue  |
| `needs-info`               | `status:needs-info`       | Waiting on reporter for more information |
| `ready-for-agent`          | `status:ready-for-agent` | Fully specified, ready for an AFK agent  |
| `ready-for-human`          | `status:ready-for-human` | Requires human implementation            |
| `wontfix`                  | `status:wontfix`          | Will not be actioned                     |

When a skill mentions a role (e.g. "apply the AFK-ready triage label"), use the corresponding label string from this table.

Use at most one `status:` and one `type:` label on an issue. The additional `status:blocked` label is reserved for work with an explicit active blocker. The type vocabulary is `type:discovery`, `type:architecture`, `type:feature`, `type:quality`, `type:documentation`, and `type:bug`.
