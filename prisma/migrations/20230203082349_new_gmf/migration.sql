-- CreateTable
CREATE TABLE "ncr" (
    "id" SERIAL NOT NULL,
    "regbes" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "audit_plan_no" TEXT NOT NULL,
    "ncr_no" TEXT NOT NULL,
    "issued_date" TEXT NOT NULL,
    "responsibility_office" TEXT NOT NULL,
    "audit_type" TEXT NOT NULL,
    "audit_scope" TEXT NOT NULL,
    "To_UIC" TEXT NOT NULL,
    "attention" TEXT NOT NULL,
    "require_condition" TEXT NOT NULL,
    "level_of_finding" INTEGER NOT NULL,
    "problem_analysis" BOOLEAN NOT NULL DEFAULT false,
    "answer_due_date" TEXT NOT NULL,
    "issue_IAN" BOOLEAN NOT NULL DEFAULT false,
    "IAN_nbr" TEXT NOT NULL,
    "encountered_condition" TEXT NOT NULL,
    "audited_by" TEXT NOT NULL,
    "audit_date" TEXT NOT NULL,
    "acknowledge_by" TEXT NOT NULL,
    "acknowledge_date" TEXT NOT NULL,
    "status" TEXT NOT NULL,
    "remark" TEXT NOT NULL,

    CONSTRAINT "ncr_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "reply" (
    "id" SERIAL NOT NULL,
    "RCA_problem" TEXT NOT NULL,
    "Corrective_Action" TEXT NOT NULL,
    "Preventive_Action" TEXT NOT NULL,
    "Identified_by_Auditee" TEXT NOT NULL,
    "Identified_Date" TEXT NOT NULL,
    "Accept_by_Auditor" TEXT NOT NULL,
    "Auditor_Accept_date" TEXT NOT NULL,
    "ncrId" INTEGER,

    CONSTRAINT "reply_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "follow" (
    "id" SERIAL NOT NULL,
    "ncrId" INTEGER,
    "Close_Corrective_Actions" TEXT,
    "Proposed_Close_Auditee" TEXT NOT NULL,
    "Proposed_Close_Date" TEXT NOT NULL,
    "Implemented_close_date" TEXT NOT NULL,
    "Is_close" BOOLEAN DEFAULT false,
    "effectiveness" BOOLEAN DEFAULT false,
    "Refer_to_Verify_Sheet" TEXT,
    "Sheet_No" TEXT,
    "New_NCR_Issue_nbr" TEXT,
    "Close_approved_by" TEXT NOT NULL,
    "Close_approved_date" TEXT NOT NULL,
    "Verified_Chief_IM" TEXT NOT NULL,
    "Verified_Date" TEXT NOT NULL,

    CONSTRAINT "follow_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ncr_audit_plan_no_key" ON "ncr"("audit_plan_no");

-- CreateIndex
CREATE UNIQUE INDEX "ncr_ncr_no_key" ON "ncr"("ncr_no");

-- AddForeignKey
ALTER TABLE "reply" ADD CONSTRAINT "reply_ncrId_fkey" FOREIGN KEY ("ncrId") REFERENCES "ncr"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "follow" ADD CONSTRAINT "follow_ncrId_fkey" FOREIGN KEY ("ncrId") REFERENCES "ncr"("id") ON DELETE SET NULL ON UPDATE CASCADE;
