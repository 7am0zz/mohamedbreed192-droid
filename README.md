<img src="./assets/matrix-banner-space-grotesk-v3.gif" alt="Mohamed Said — Computer Science Student. Software Engineering · AI · Cloud Computing. Animated green binary rain on black." width="1200">

[**3D portfolio source ↗**](docs/index.html) · [Live portfolio](https://mohamedbreed192-droid.github.io/mohamedbreed192-droid/)



**Computer Science student · Building toward a career in software engineering**

I'm studying Computer Science at Canadian University Dubai, with career interests in artificial intelligence and cloud computing. I want to build software that solves useful problems and is clear enough for other people to understand, test, and maintain.

## Featured Projects

[IncidentLens](#incidentlens) · [AccessLedger](#accessledger) · [QueueBridge](#queuebridge) · [Aircraft Engine Predictive Maintenance](#aircraft-engine-predictive-maintenance)

Four student projects spanning software engineering and machine learning. The three applications use **synthetic data**; the aircraft engine graduation project uses NASA C-MAPSS simulated sensor data. Screenshots show the application interfaces and recorded demo activity. These projects are research and learning work.

### [IncidentLens](https://github.com/mohamedbreed192-droid/incidentlens)

Investigate application log failures with **inspectable evidence**. IncidentLens extracts log-line signals, retrieves permitted runbook sections, and presents a suggested investigation direction for human review.

[![IncidentLens investigation showing observed log evidence, versioned runbook citations, human review, and activity history](assets/projects/incidentlens-investigation.png)](assets/projects/incidentlens-investigation.png)

**Technology:** Python · FastAPI · PostgreSQL · SQLAlchemy · Alembic · HTML/CSS/JavaScript

- Filters runbook access in the retrieval query before context reaches analysis.
- Links suggestions to log lines and source versions; withholds reports when their sources change or become inaccessible.
- Records accept/reject decisions and audit events; abstains on unsupported or conflicting signals.

**Scope:** Synthetic logs and runbooks; deterministic baseline. No commands or infrastructure changes.

[Source code](https://github.com/mohamedbreed192-droid/incidentlens) · [Local setup](https://github.com/mohamedbreed192-droid/incidentlens#start-the-local-demo) · [Evaluation & limitations](https://github.com/mohamedbreed192-droid/incidentlens/blob/main/docs/EVALUATION.md)

<details>
<summary>Analysis limits & model integration</summary>

The baseline covers three failure categories with English lexical rules. Negation and quoted examples are known failure modes; valid citations do not prove an explanation is true. An optional OpenAI adapter is implemented, but provider tests use mocks and live model behavior has not been verified. There is no implemented IBM integration.

</details>

---

### [AccessLedger](https://github.com/mohamedbreed192-droid/accessledger)

Review employee access with **explainable findings and accountable decisions**. AccessLedger validates CSV imports, snapshots review campaigns, and lets assigned reviewers record retain/revoke recommendations with a rationale.

[![AccessLedger review of a fictional employee's access, showing frozen permission evidence, stale-access and conflicting-permission findings, and a human decision form](assets/projects/accessledger-access-review.png)](assets/projects/accessledger-access-review.png)

**Technology:** Python · FastAPI · PostgreSQL · SQLAlchemy · Alembic · Jinja2

- Requires explicit confirmation after row-level CSV validation; snapshots grants, assignments, rule output, and evaluation time.
- Restricts decisions to assigned reviewers and rejects stale updates with version checks.
- Preserves previous decisions in audit events; exports decisions and audit history as formula-protected CSV files.

**Scope:** Fictional employees and grants. Revocation records a recommendation; it never changes external permissions. Audit history is not tamper-proof or a compliance certification.

[Source code](https://github.com/mohamedbreed192-droid/accessledger) · [Local setup](https://github.com/mohamedbreed192-droid/accessledger#run-locally) · [Architecture & decisions](https://github.com/mohamedbreed192-droid/accessledger/blob/main/docs/architecture.md)

---

### [QueueBridge](https://github.com/mohamedbreed192-droid/queuebridge)

Follow orders through **asynchronous processing and recovery**. QueueBridge accepts synthetic supplier orders, persists order and outbox records in one transaction, and processes RabbitMQ deliveries with a database-backed inbox.

[![QueueBridge operations console with synthetic order submission, database-derived status counts, and an order ledger](assets/projects/queuebridge-order-ledger.png)](assets/projects/queuebridge-order-ledger.png)

**Technology:** Java 21 · Spring Boot · PostgreSQL · RabbitMQ · Flyway · Thymeleaf

- Reuses an order for the same idempotency key and content; rejects conflicting submissions.
- Checks publisher confirms and routing; uses inbox records to handle duplicate deliveries.
- Implements delayed retries, dead letters, and bounded administrator replay with recorded reasons.

**Scope:** Local learning project with at-least-once delivery and synthetic orders. No payments, external fulfillment, or IBM MQ integration.

[Source code](https://github.com/mohamedbreed192-droid/queuebridge) · [Local setup](https://github.com/mohamedbreed192-droid/queuebridge#run-locally) · [Architecture & crash windows](https://github.com/mohamedbreed192-droid/queuebridge/blob/main/docs/architecture.md)

<details>
<summary>Real recovery timeline & delivery limits</summary>

[![QueueBridge order trace showing retry attempts, exhaustion, fulfillment after administrator replay, broker delivery records, and administrative history](assets/projects/queuebridge-recovery-timeline.png)](assets/projects/queuebridge-recovery-timeline.png)

Broker confirmation establishes acceptance and routing at publish time; it does not prove fulfillment. Delivery can repeat across crash windows. The local Failure Lab uses explicit synthetic scenarios; it is not evidence of production resilience.

[Failure and recovery walkthrough](https://github.com/mohamedbreed192-droid/queuebridge/blob/main/docs/demo.md)

</details>

---

<a id="aircraft-engine-predictive-maintenance"></a>
### [AI-Powered Predictive Maintenance for Aircraft Engines](https://github.com/mohamedbreed192-droid/aircraft-engine-predictive-maintenance)

**Computer Science graduation project · Phase 1 — Machine Learning Baseline and Research**

[![Aircraft engine RUL baseline: actual versus predicted remaining useful life for 100 test engines, with RMSE 17.661 cycles](assets/projects/aircraft-engine-rul.png)](https://github.com/mohamedbreed192-droid/aircraft-engine-predictive-maintenance/blob/main/results/evaluation_notes.md)

Predict aircraft engine **Remaining Useful Life (RUL)** from NASA C-MAPSS FD001 simulated sensor measurements using a Random Forest regressor.

**Technology:** Python · scikit-learn · pandas · NumPy · Matplotlib · Jupyter · GitHub Actions

- Builds RUL targets from complete training lifetimes, caps labels at 125 cycles, and selects sensors using training variance.
- Evaluates each test engine’s final observed cycle against official RUL labels, also capped at 125 cycles.
- Records measured **RMSE of 17.661 cycles**, **MAE of 12.351 cycles**, and **R² of 0.806** across 100 test engines.
- Includes reproducible Python modules, five passing unit tests, dataset hashes, per-engine predictions, and a five-paper literature review.

**Scope:** Phase 1 baseline on simulated data. Notebook and Python module results match. Advanced models, security evaluation, and deployment are planned future work.

[Source code](https://github.com/mohamedbreed192-droid/aircraft-engine-predictive-maintenance) · [Reproduce the baseline](https://github.com/mohamedbreed192-droid/aircraft-engine-predictive-maintenance#reproduce) · [Evaluation & results](https://github.com/mohamedbreed192-droid/aircraft-engine-predictive-maintenance/blob/main/results/evaluation_notes.md) · [Literature review](https://github.com/mohamedbreed192-droid/aircraft-engine-predictive-maintenance/blob/main/research/literature_review.md)

## Technical toolkit

My public work in [IncidentLens](https://github.com/mohamedbreed192-droid/incidentlens) uses:

| Area | Technologies used in the project |
| --- | --- |
| Programming & web | Python, JavaScript, HTML, CSS |
| Backend development | FastAPI, Pydantic, SQLAlchemy |
| Data | PostgreSQL, full-text search, Alembic migrations |
| Development & verification | Git, Docker Compose, pytest, Ruff, Playwright, GitHub Actions |

My existing academic toolkit also includes **C++, Java, Linux, and Bash scripting**. AI and cloud computing are areas I want to explore further.

## Current direction

Through my Computer Science studies, I'm continuing to develop my programming fundamentals, data structures, and algorithms. My goal is to connect those foundations to practical software with clear design decisions, useful documentation, and reproducible checks.

Software engineering is my career direction; AI and cloud computing are longer-term interests.

## Connect

[GitHub](https://github.com/mohamedbreed192-droid) · [Email](mailto:mohamedbreed192@gmail.com)
