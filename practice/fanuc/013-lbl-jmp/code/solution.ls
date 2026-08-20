/PROG LBL_JMP
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
   1:  ! Atom: JMP LBL, not GOTO. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  JMP LBL[10] ;
   5:  ! skipped remarks ;
   6:  ! do not run this block ;
   7:  LBL[10] ;
   8:  J PR[1:Home] 15% FINE    ;
   9:  END ;
/POS
/END
