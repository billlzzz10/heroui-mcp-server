# 1) Canon กลาง: md = outline = mindmap

แนวคิด: Markdown คือเพียงตัวแทนข้อความของ Outline; Outline คือโครงสร้างลำดับชั้น; MindMap คือ Outline แบบกราฟต้นไม้

## 1.1 โครงสร้างกลางที่เท่ากัน

* Document.title → H1
* Section(depth=h-1) ↔ Heading H{h}
* Bullet ↔ list item
* Task ↔ checkbox `- [ ]` / `- [x]`
* Decision ↔ quote เริ่มด้วย `Decision:`
* Resource ↔ link `[text](url)`
* Relation (ไม่ใช่ลำดับชั้น) ↔ อ้างอิงแบบ footnote `[^rel:ID]` หรือ comment

## 1.2 ตาราง mapping ย่อ

| MindMap node.role              | Outline                          | Markdown                   |
| ------------------------------ | -------------------------------- | -------------------------- |
| concept, note, resource(title) | section                          | `## …` `### …` + paragraph |
| example                        | bullet                           | `- …`                      |
| task                           | task                             | `- [ ] …` / `- [x] …`      |
| decision                       | section.content แบบชนิด decision | `> Decision: …`            |
| resource(link)                 | bullet link หรือ paragraph link  | `[Title](URL)`             |

## 1.3 ID แบบกำหนดได้

* ถ้าไม่มี preserveIds ให้สร้าง `sha1(docId + path)` โดย path = `h2[0]/h3[2]/b[1]` เพื่อย้อนกลับได้เสถียร

---

# 2) ตัวอย่างครบทุกชนิดในเอกสารเดียว

## 2.1 Markdown ตัวอย่าง

```markdown
<!-- layout: tree-right -->
# Project Alpha

## Overview
ย่อหน้าอธิบาย

- Example: quick demo
[Docs](https://example.com)

## Tasks
- [ ] Setup repo @alice due:2025-12-01 priority:high
- [x] Draft spec @bob

## Decision
> Decision: Use PostgreSQL for OLTP

## Notes
ข้อความทั่วไป
```

## 2.2 Outline JSON ที่เท่ากัน (ย่อ)

```json
{
  "id": "out-001",
  "title": "Project Alpha",
  "meta": { "sourceFormat": "outline", "ruleVersion": "v1.0.0" },
  "sections": [
    {
      "id": "s-ov",
      "headingLevel": 2,
      "order": 0,
      "title": "Overview",
      "content": "ย่อหน้าอธิบาย",
      "bullets": [
        { "id": "b-1", "content": "Example: quick demo", "role": "example" },
        { "id": "b-2", "content": "[Docs](https://example.com)", "role": "resource" }
      ]
    },
    {
      "id": "s-tasks",
      "headingLevel": 2,
      "order": 1,
      "title": "Tasks",
      "tasks": [
        { "id": "t-1", "content": "Setup repo", "assignee": "alice", "dueDate": "2025-12-01", "status": "todo", "priority": "high" },
        { "id": "t-2", "content": "Draft spec", "assignee": "bob", "status": "done" }
      ]
    },
    {
      "id": "s-decision",
      "headingLevel": 2,
      "order": 2,
      "title": "Decision",
      "content": "Use PostgreSQL for OLTP",
      "metadata": { "kind": "decision" }
    },
    {
      "id": "s-notes",
      "headingLevel": 2,
      "order": 3,
      "title": "Notes",
      "content": "ข้อความทั่วไป"
    }
  ]
}
```

## 2.3 MindMap JSON ที่เท่ากัน (ย่อ)

```json
{
  "id": "mm-001",
  "title": "Project Alpha",
  "meta": { "sourceFormat": "mindmap", "ruleVersion": "v1.0.0", "layout": "tree-right" },
  "nodes": [
    { "id": "n-root", "parentId": null, "order": 0, "title": "Project Alpha", "role": "concept" },

    { "id": "n-ov", "parentId": "n-root", "order": 0, "title": "Overview", "content": "ย่อหน้าอธิบาย", "role": "concept" },
    { "id": "n-ex", "parentId": "n-ov", "order": 0, "title": "Example", "content": "quick demo", "role": "example" },
    { "id": "n-doc", "parentId": "n-ov", "order": 1, "title": "Docs", "content": "https://example.com", "role": "resource" },

    { "id": "n-tasks", "parentId": "n-root", "order": 1, "title": "Tasks", "role": "concept" },
    { "id": "t-1", "parentId": "n-tasks", "order": 0, "title": "Setup repo", "role": "task", "assignee": "alice", "dueDate": "2025-12-01", "priority": "high", "status": "todo" },
    { "id": "t-2", "parentId": "n-tasks", "order": 1, "title": "Draft spec", "role": "task", "assignee": "bob", "status": "done" },

    { "id": "n-decision", "parentId": "n-root", "order": 2, "title": "Decision", "content": "Use PostgreSQL for OLTP", "role": "decision" },

    { "id": "n-notes", "parentId": "n-root", "order": 3, "title": "Notes", "content": "ข้อความทั่วไป", "role": "note" }
  ],
  "relations": []
}
```

---

# 3) เครื่องมือพื้นฐานที่ “MCP server” ควรมี

มองเป็นชุด “tools” ที่ค้นหาและเรียกใช้ได้

**Discovery**

* `tools.list` รายการเครื่องมือ
* `tools.get` รายละเอียดเครื่องมือและสคีมา I/O

**Core Data**

* `map.list`, `map.get`, `map.create`, `map.update`, `node.update`

**Parse/Format (md⇄outline)**

* `markdown.parse` → Outline
* `markdown.format` ← Outline

**Transform (outline⇄mindmap)**

* `convert.outlineToMindmap`
* `convert.mindmapToOutline`

**Validate**

* `validate.schema` ตรวจตาม JSON Schema
* `validate.roundtrip` ทดสอบ md→outline→mindmap→outline→md

**Provenance / Jobs / Export**

* `provenance.list`
* `job.get`, `job.cancel`
* `export.start`, `export.status` (md/pdf/jpg)

**Config**

* `config.get`, `config.set` (ruleVersion, preserveIds, layout default)

---

# 4) โครงไฟล์เก็บก่อนทำ “วิชวล”

```
data/
  maps/<mapId>.json                 # canonical mindmap
  derived/<mapId>/outline.json      # เก็บผล outline ถ้าต้องการ
  markdown/<mapId>.md               # เก็บ md ถ้าต้องการ
  provenance/<mapId>.log.json
  jobs/<jobId>.json
  artifacts/<artifactId>.(md|pdf|jpg)
```

---

# 5) OpenAPI 3.1 (ครอบคลุม md=outline=mindmap ชุดหลัก)

คัดแบบ REST ให้เรียกง่ายด้วย curl (เข้มงวด type, มีตัวอย่าง)

```yaml
openapi: 3.1.0
info:
  title: Canonical Mapping API
  version: 1.0.0
servers:
  - url: http://localhost:4000
paths:
  /tools:
    get:
      summary: List available tools
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  tools:
                    type: array
                    items:
                      type: object
                      properties:
                        name: { type: string }
                        description: { type: string }
                        inputSchemaRef: { type: string }
                        outputSchemaRef: { type: string }
  /tools/{name}:
    get:
      summary: Get tool detail
      parameters:
        - in: path
          name: name
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
  /maps:
    get:
      summary: List mindmaps
      parameters:
        - in: query
          name: limit
          schema: { type: integer, minimum: 1, default: 50 }
        - in: query
          name: offset
          schema: { type: integer, minimum: 0, default: 0 }
      responses:
        '200':
          description: OK
    post:
      summary: Create mindmap (canonical)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CanonicalMindMap'
      responses:
        '201':
          description: Created
          content:
            application/json:
              schema:
                type: object
                properties:
                  mapId: { type: string }
                  map:
                    $ref: '#/components/schemas/CanonicalMindMap'
  /maps/{mapId}:
    get:
      summary: Get a mindmap
      parameters:
        - in: path
          name: mapId
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CanonicalMindMap'
    patch:
      summary: Update a mindmap (batch)
      parameters:
        - in: path
          name: mapId
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                partial:
                  $ref: '#/components/schemas/CanonicalMindMap'
                options:
                  type: object
                  properties:
                    mergeNodesById: { type: boolean, default: true }
      responses:
        '200':
          description: OK
  /maps/{mapId}/nodes/{nodeId}:
    patch:
      summary: Update single node
      parameters:
        - in: path
          name: mapId
          required: true
          schema: { type: string }
        - in: path
          name: nodeId
          required: true
          schema: { type: string }
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/MindMapNodePartial'
      responses:
        '200':
          description: OK
  /markdown/parse:
    post:
      summary: Parse Markdown -> Outline (canonical)
      requestBody:
        required: true
        content:
          text/markdown:
            schema: { type: string }
          application/json:
            schema:
              type: object
              properties:
                markdown: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/CanonicalOutline'
  /markdown/format:
    post:
      summary: Format Outline -> Markdown
      requestBody:
        required: true
        content:
          application/json:
            schema:
              $ref: '#/components/schemas/CanonicalOutline'
      responses:
        '200':
          description: OK
          content:
            text/markdown:
              schema: { type: string }
  /convert:
    post:
      summary: Outline<->MindMap transform
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                fromFormat:
                  type: string
                  enum: [mindmap, outline]
                toFormat:
                  type: string
                  enum: [mindmap, outline]
                payload:
                  oneOf:
                    - $ref: '#/components/schemas/CanonicalMindMap'
                    - $ref: '#/components/schemas/CanonicalOutline'
                options:
                  $ref: '#/components/schemas/ConvertOptions'
      responses:
        '200':
          description: Sync convert
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ConvertResult'
        '202':
          description: Async job queued
          content:
            application/json:
              schema:
                type: object
                properties:
                  jobId: { type: string }
                  status: { type: string, enum: [queued] }
  /jobs/{jobId}:
    get:
      summary: Get job status
      parameters:
        - in: path
          name: jobId
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/Job'
  /export:
    post:
      summary: Export map to artifact (md/pdf/jpg)
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                mapId: { type: string }
                format: { type: string, enum: [md, pdf, jpg] }
                options:
                  $ref: '#/components/schemas/ExportOptions'
      responses:
        '202':
          description: Job queued
          content:
            application/json:
              schema:
                type: object
                properties:
                  jobId: { type: string }
  /exports/{jobId}:
    get:
      summary: Export job status
      parameters:
        - in: path
          name: jobId
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: object
                properties:
                  jobId: { type: string }
                  status: { type: string, enum: [queued, running, completed, failed] }
                  artifact:
                    $ref: '#/components/schemas/ExportArtifact'
  /provenance/{mapId}:
    get:
      summary: List provenance entries
      parameters:
        - in: path
          name: mapId
          required: true
          schema: { type: string }
      responses:
        '200':
          description: OK
          content:
            application/json:
              schema:
                type: array
                items:
                  $ref: '#/components/schemas/ProvenanceEntry'
components:
  schemas:
    CanonicalMeta:
      type: object
      properties:
        createdAt: { type: string, format: date-time }
        updatedAt: { type: string, format: date-time }
        authorId: { type: string }
        sourceFormat: { type: string, enum: [mindmap, outline] }
        version: { type: integer }
        ruleVersion: { type: string }
        layout: { type: string }
    MindMapNode:
      type: object
      required: [id, parentId, order, title]
      properties:
        id: { type: string }
        parentId: { type: [string, "null"] }
        order: { type: integer }
        title: { type: string }
        content: { type: string }
        role:
          type: string
          enum: [concept, note, resource, example, task, decision]
        visual:
          type: object
          properties:
            color: { type: string }
            shape: { type: string }
            icon: { type: string }
        tags:
          type: array
          items: { type: string }
        assignee: { type: string }
        dueDate: { type: string, format: date }
        priority: { type: string, enum: [low, medium, high] }
        status: { type: string }
        refs:
          type: array
          items: { type: string }
        metadata: { type: object, additionalProperties: true }
    MindMapNodePartial:
      type: object
      additionalProperties: true
    MindMapRelation:
      type: object
      required: [id, from, to, type]
      properties:
        id: { type: string }
        from: { type: string }
        to: { type: string }
        type: { type: string }
        label: { type: string }
    CanonicalMindMap:
      type: object
      required: [id, title, meta, nodes, relations]
      properties:
        id: { type: string }
        title: { type: string }
        meta: { $ref: '#/components/schemas/CanonicalMeta' }
        nodes:
          type: array
          items: { $ref: '#/components/schemas/MindMapNode' }
        relations:
          type: array
          items: { $ref: '#/components/schemas/MindMapRelation' }
    OutlineBullet:
      type: object
      required: [id, content]
      properties:
        id: { type: string }
        content: { type: string }
        role: { type: string, enum: [example, resource, note, concept] }
    OutlineTask:
      type: object
      required: [id]
      properties:
        id: { type: string }
        content: { type: string }
        assignee: { type: string }
        dueDate: { type: string, format: date }
        status: { type: string }
        priority: { type: string }
    OutlineSection:
      type: object
      required: [id, headingLevel, order, title]
      properties:
        id: { type: string }
        headingLevel: { type: integer, minimum: 1, maximum: 6 }
        order: { type: integer }
        title: { type: string }
        content: { type: string }
        bullets:
          type: array
          items: { $ref: '#/components/schemas/OutlineBullet' }
        tasks:
          type: array
          items: { $ref: '#/components/schemas/OutlineTask' }
        metadata: { type: object, additionalProperties: true }
    CanonicalOutline:
      type: object
      required: [id, title, meta, sections]
      properties:
        id: { type: string }
        title: { type: string }
        meta: { $ref: '#/components/schemas/CanonicalMeta' }
        sections:
          type: array
          items: { $ref: '#/components/schemas/OutlineSection' }
    ConvertOptions:
      type: object
      properties:
        preserveIds: { type: boolean, default: true }
        conflictStrategy:
          type: string
          enum: [create-reference, auto-split, ask-user]
        async: { type: boolean, default: false }
    ConvertResult:
      type: object
      properties:
        format: { type: string, enum: [mindmap, outline] }
        result:
          oneOf:
            - $ref: '#/components/schemas/CanonicalMindMap'
            - $ref: '#/components/schemas/CanonicalOutline'
        metadata:
          type: object
          properties:
            ruleVersion: { type: string }
            mappingSummary:
              type: object
              properties:
                nodesMapped: { type: integer }
                nodesSplit: { type: integer }
                nodesReferenced: { type: integer }
                warnings:
                  type: array
                  items: { type: string }
    Job:
      type: object
      properties:
        id: { type: string }
        type: { type: string }
        status: { type: string, enum: [queued, running, completed, failed, cancelled] }
        progress: { type: integer, minimum: 0, maximum: 100 }
        result: { type: object }
        error: { type: object }
    ExportOptions:
      type: object
      properties:
        md:
          type: object
          properties:
            includeTasks: { type: boolean, default: true }
        pdf:
          type: object
          properties:
            pageSize: { type: string, default: A4 }
            orientation: { type: string, enum: [portrait, landscape], default: portrait }
        jpg:
          type: object
          properties:
            width: { type: integer }
            height: { type: integer }
    ExportArtifact:
      type: object
      properties:
        id: { type: string }
        type: { type: string }
        url: { type: string }
    ProvenanceEntry:
      type: object
      properties:
        id: { type: string }
        mapId: { type: string }
        timestamp: { type: string, format: date-time }
        userId: { type: string }
        action: { type: string }
        details: { type: object }
```

---

# 6) วิธีใช้เร็วด้วย curl

* สร้าง mindmap: `POST /maps` ด้วย JSON ตาม CanonicalMindMap
* แปลงเป็น outline: `POST /convert` `{fromFormat:"mindmap",toFormat:"outline",payload:{...}}`
* สร้าง Markdown: `POST /markdown/format` ส่ง Outline
* ย้อนกลับ: `POST /markdown/parse` แล้ว `POST /convert` ไป mindmap
* ดู provenance: `GET /provenance/{mapId}`

---

# 7) สรุป

* เรากำหนด canon กลาง md = outline = mindmap สำหรับข้อความแล้ว
* วางเครื่องมือ MCP พื้นฐาน: discovery, core data, parse/format, transform, validate, provenance, jobs, export, config
* ให้ OpenAPI ครอบคลุมการใช้งานหลักทั้งหมด
* ขั้นต่อไปค่อยเพิ่ม “infographic” โดยใส่ `layout` และตำแหน่งใน schema และเพิ่มเส้นทาง `/convert` ให้รองรับ `toFormat: infographic` และ `/render` สำหรับ SVG/ภาพ