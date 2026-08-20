/PROG PALLET
/ATTR
OWNER		= MNEDITOR;
COMMENT		= "Study listing not a backup. ATTR sizes may be 0. Educational; own risk.";
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
   1:  ! Matrix: X=X0+col*dx, Y=Y0+row*dy. Teach X0 Y0 dx dy on cell. PR element 1=X 2=Y confirm. ;
   2:  UFRAME_NUM=1 ;
   3:  UTOOL_NUM=1 ;
   4:  R[1]=0 ;
   5:  R[2]=0 ;
   6:  R[3]=2 ;
   7:  R[4]=2 ;
   8:  ! R[5]=dx R[6]=dy R[10]=X0 R[11]=Y0 PLACEHOLDERS. Load real mm on cell. ;
   9:  R[5]=50 ;
  10:  R[6]=50 ;
  11:  R[10]=0 ;
  12:  R[11]=0 ;
  13:  LBL[10] ;
  14:  R[7]=R[10]+R[2]*R[5] ;
  15:  R[8]=R[11]+R[1]*R[6] ;
  16:  PR[2,1]=R[7] ;
  17:  PR[2,2]=R[8] ;
  18:  OFFSET CONDITION PR[2] ;
  19:  L P[2] 100mm/sec FINE Offset ;
  20:  R[2]=R[2]+1 ;
  21:  IF R[2]<R[4],JMP LBL[10] ;
  22:  R[2]=0 ;
  23:  R[1]=R[1]+1 ;
  24:  IF R[1]<R[3],JMP LBL[10] ;
  25:  J PR[1:Home] 20% FINE    ;
  26:  END ;
/POS
/END
