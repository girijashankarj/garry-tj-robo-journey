/PROG PR_LPOS
/ATTR
OWNER		= MNEDITOR;
COMMENT		= "Study drill. FANUC rights. Educational; own risk.";
PROG_SIZE	= 0;
CREATE		= DATE 26-08-20  TIME 21:00:00;
MODIFIED	= DATE 26-08-20  TIME 21:00:00;
FILE_NAME	= ;
VERSION		= 0;
LINE_COUNT	= 0;
MEMORY_SIZE	= 0;
PROTECT		= READ_WRITE;
TCD:  STACK_SIZE	= 0,
      TASK_PRIORITY	= 50,
      TIME_SLICE	= 0,
      BUSY_LAMP_OFF	= 0,
      ABORT_REQUEST	= 0,
      PAUSE_REQUEST	= 0;
DEFAULT_GROUP	= 1,*,*,*,*;
CONTROL_CODE	= 00000000 00000000;
/APPL
/MN
   0:  ! FANUC retains all rights in its marks/software/manuals. Educational only. Use at your own consent and risk. See LEGAL.md ;
   1:  ! PR[1,1]=X PR[1,2]=Y. Distances are class examples.
   2:  J P[1] 100% FINE    ;
   3:  J P[2] 100% FINE    ;
   4:  PR[1]=LPOS    ;
   5:  PR[1,1]=PR[1,1]+300    ;
   6:  L PR[1] 800mm/sec FINE    ;
   7:  PR[1,2]=PR[1,2]+300    ;
   8:  L PR[1] 800mm/sec FINE    ;
   9:  PR[1,1]=PR[1,1]-300    ;
   10:  L PR[1] 800mm/sec FINE    ;
   11:  PR[1,2]=PR[1,2]-300    ;
   12:  L PR[1] 800mm/sec FINE    ;
   13:  J P[1] 100% FINE    ;
   14:  END ;
/POS
/END
