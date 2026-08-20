/PROG SQUARE
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
   1:  ! Training reconstruction. Teach P[] on YOUR cell.
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  J P[1] 100% FINE    ;
   5:  J P[2] 100% FINE    ;
   6:  L P[3] 500mm/sec FINE    ;
   7:  L P[4] 500mm/sec FINE    ;
   8:  L P[5] 500mm/sec FINE    ;
   9:  L P[2] 500mm/sec FINE    ;
   10:  J P[1] 100% FINE    ;
   11:  END ;
/POS
/END
